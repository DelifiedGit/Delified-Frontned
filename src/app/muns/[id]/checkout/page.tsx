'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchMUNById, processPayment, createRegistration } from '@/lib/api'
import { ArrowRight, CreditCard, User, Calendar, Lock } from 'lucide-react'

interface MUNEvent {
  id: string
  event_name: string
  registration_fees: number
}

interface CheckoutProps {
  params: { id: string }
}

export default function CheckoutPage({ params }: CheckoutProps) {
  const [munEvent, setMunEvent] = useState<MUNEvent | null>(null)
  const [formData, setFormData] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const router = useRouter()
  const searchParams = useSearchParams()
  const encodedFormData = searchParams.get('formData')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const munData = await fetchMUNById(params.id)
        setMunEvent(munData)
        if (encodedFormData) {
          setFormData(JSON.parse(decodeURIComponent(encodedFormData)))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load checkout details. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id, encodedFormData])

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!munEvent) return

    setIsProcessing(true)
    setError(null)

    try {
      // Process payment
      const paymentResult = await processPayment({
        munId: munEvent.id,
        amount: munEvent.registration_fees,
      })

      // Create registration
      const registrationResult = await createRegistration({
        mun: munEvent.id,
        payment_id: paymentResult.payment_id,
        custom_fields: formData,
      })

      // Redirect to confirmation page
      router.push(`/muns/${params.id}/confirmation?registrationId=${registrationResult.id}`)
    } catch (error) {
      console.error('Error during checkout:', error)
      setError('Checkout failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-indigo-600"
        >
          Loading your epic checkout experience...
        </motion.div>
      </div>
    )
  }

  if (error || !munEvent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-red-500"
        >
          {error || 'Oops! MUN not found. Time for a coffee break?'}
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
        >
          You're Almost There!
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`rounded-full h-12 w-12 flex items-center justify-center ${
                      step >= i ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {i}
                  </div>
                  {i === 1 && (
                    <div className={`h-1 w-full ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm font-medium text-indigo-600">Registration Details</span>
              <span className="text-sm font-medium text-indigo-600">Payment</span>
            </div>
          </div>
        </motion.div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {step === 1 && (
              <Card className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-indigo-700">Your Epic Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.entries(formData).map(([key, value]) => (
                    <div key={key} className="mb-4">
                      <Label htmlFor={key} className="text-lg font-medium text-gray-700">{key}</Label>
                      <Input
                        id={key}
                        value={value}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        required
                        className="mt-1 bg-white bg-opacity-50 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-full hover:shadow-lg transition duration-300"
                  >
                    Next: Payment <ArrowRight className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: step === 2 ? 1 : 0, y: step === 2 ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {step === 2 && (
              <Card className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-indigo-700">Secure Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Label htmlFor="cardNumber" className="text-lg font-medium text-gray-700">Card Number</Label>
                    <div className="relative">
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required className="pl-10 bg-white bg-opacity-50 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500" />
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate" className="text-lg font-medium text-gray-700">Expiry Date</Label>
                      <div className="relative">
                        <Input id="expiryDate" placeholder="MM/YY" required className="pl-10 bg-white bg-opacity-50 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500" />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-lg font-medium text-gray-700">CVV</Label>
                      <div className="relative">
                        <Input id="cvv" placeholder="123" required className="pl-10 bg-white bg-opacity-50 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500" />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-indigo-700">Total:</span>
                      <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                        ₹{munEvent.registration_fees}
                      </span>
                    </div>
                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-full hover:shadow-lg transition duration-300"
                    >
                      {isProcessing ? 'Processing...' : 'Complete Payment'}
                      <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )}
          </motion.div>
        </form>
      </div>
    </div>
  )
}

