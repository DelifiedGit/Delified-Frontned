'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { fetchMUNById, createRegistration } from '@/lib/api'

interface MUNEvent {
  id: string
  event_name: string
  price: number
  customFields?: { [key: string]: string | string[] }
  registration_fees: string
}

interface CheckoutProps {
  params: { id: string }
}

export default function CheckoutPage({ params }: CheckoutProps) {
  const [munEvent, setMunEvent] = useState<MUNEvent | null>(null)
  const [formData, setFormData] = useState<{ [key: string]: string | string[] }>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const paymentId = searchParams.get('paymentId')
  const encodedFormData = searchParams.get('formData')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        if (!paymentId) {
          throw new Error('Payment ID is missing')
        }
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
  }, [params.id, paymentId, encodedFormData])

  const handleInputChange = (key: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const registration = await createRegistration({
        mun: params.id,
        payment_id: paymentId!,
        custom_fields: formData,
      })
      console.log('Registration successful:', registration)
      router.push(`/muns/${params.id}/confirmation?registrationId=${registration.id}`)
    } catch (error) {
      console.error('Error during registration:', error)
      setError('Registration failed. Please try again.')
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
            {munEvent.customFields && Object.entries(munEvent.customFields).map(([key, field]) => (
              <div key={key} className="mb-4">
                <Label htmlFor={key}>{key}</Label>
                {Array.isArray(field) ? (
                  field.length > 3 ? (
                    <Select onValueChange={(value) => handleInputChange(key, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${key}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.map((option, index) => (
                          <SelectItem key={index} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <RadioGroup onValueChange={(value) => handleInputChange(key, value)}>
                      {field.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`${key}-${index}`} />
                          <Label htmlFor={`${key}-${index}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )
                ) : (
                  <Input
                    id={key}
                    value={formData[key] as string}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    required
                  />
                )}
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
              <Button type="submit">Complete Registration</Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

