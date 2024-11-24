'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface CheckoutProps {
  params: { id: string }
}

interface MUNEvent {
  id: string
  title: string
  price: number
  customFields?: { [key: string]: string | string[] }
}

export default function CheckoutPage({ params }: CheckoutProps) {
  const [munEvent, setMunEvent] = useState<MUNEvent | null>(null)
  const [formData, setFormData] = useState<{ [key: string]: string | string[] }>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [state, setState] = useState(false);

  useEffect(() => {
    const fetchMUNEvent = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/muns/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch MUN event')
        }
        const data = await response.json()
        setMunEvent(data)
        // Initialize form data with custom fields
        if (data.customFields) {
          const initialFormData: { [key: string]: string | string[] } = {}
          Object.keys(data.customFields).forEach(key => {
            initialFormData[key] = Array.isArray(data.customFields[key]) ? [] : ''
          })
          setFormData(initialFormData)
        }
      } catch (error) {
        console.error('Error fetching MUN event:', error)
        setError('Failed to load MUN details. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMUNEvent()
  }, [params.id])

  const handleInputChange = (key: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/muns/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          munId: params.id,
          ...formData,
        }),
      })

      if (!response.ok) {
        throw new Error('Checkout failed')
      }

      const checkoutResult = await response.json()
      console.log('Checkout successful:', checkoutResult)
      router.push(`/muns/${params.id}/confirmation`)
    } catch (error) {
      console.error('Error during checkout:', error)
      setError('Checkout failed. Please try again.')
    }
  }

  if (isLoading) {
    return <div className="text-center py-10">Loading checkout...</div>
  }

  if (error || !munEvent) {
    return <div className="text-center py-10 text-red-500">{error || 'MUN not found'}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout for {munEvent.title}</h1>
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
            {/* Add payment form fields here */}
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
              <span className="text-2xl font-bold">Total: ₹{munEvent.price}</span>
              <Button type="submit">Complete Payment</Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}