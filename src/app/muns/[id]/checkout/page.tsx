'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchMUNById, processPayment, createRegistration } from '@/lib/api'

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
    return <div className="text-center py-10">Loading checkout details...</div>
  }

  if (error || !munEvent) {
    return <div className="text-center py-10 text-red-500">{error || 'MUN not found'}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout for {munEvent.event_name}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Registration Details</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="mb-4">
                <Label htmlFor={key}>{key}</Label>
                <Input
                  id={key}
                  value={value}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  required
                  disabled
                />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input id="expiryDate" placeholder="MM/YY" required />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" required />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-between items-center">
              <span className="text-2xl font-bold">Total: ₹{munEvent.registration_fees}</span>
              <Button type="submit" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Complete Payment'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

