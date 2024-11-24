// src/app/checkout/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const [munId, setMunId] = useState('')
  const [participants, setParticipants] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('card')

  useEffect(() => {
    setMunId(searchParams.get('munId') || '')
    setParticipants(Number(searchParams.get('participants')) || 0)
    setTotalPrice(Number(searchParams.get('totalPrice')) || 0)
  }, [searchParams])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle payment processing here
    console.log('Processing payment:', { munId, participants, totalPrice, paymentMethod })
    // Redirect to confirmation page or show success message
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="mb-4">
          <p>MUN ID: {munId}</p>
          <p>Number of Participants: {participants}</p>
          <p className="text-xl font-bold">Total Price: ₹{totalPrice}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <RadioGroup
              defaultValue="card"
              onValueChange={(value) => setPaymentMethod(value)}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card">Credit/Debit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi">UPI</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="netbanking" id="netbanking" />
                <Label htmlFor="netbanking">Net Banking</Label>
              </div>
            </RadioGroup>
          </div>
          {paymentMethod === 'card' && (
            <>
              <div>
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
            </>
          )}
          {paymentMethod === 'upi' && (
            <div>
              <Label htmlFor="upiId">UPI ID</Label>
              <Input id="upiId" placeholder="yourname@upi" required />
            </div>
          )}
          {paymentMethod === 'netbanking' && (
            <div>
              <Label htmlFor="bank">Select Bank</Label>
              <select
                id="bank"
                className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select a bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
              </select>
            </div>
          )}
          <Button type="submit" className="w-full">
            Pay ₹{totalPrice}
          </Button>
        </form>
      </div>
    </div>
  )
}