'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchRegistrationDetails } from '@/lib/api'
import { Check, Share2, Calendar, MapPin, DollarSign } from 'lucide-react'

interface ConfirmationProps {
  params: { id: string }
}

interface RegistrationDetails {
  id: string
  mun: {
    id: string
    event_name: string
  }
  custom_fields: Record<string, any>
  payment: {
    amount: number
    status: string
  }
}

export default function ConfirmationPage({ params }: ConfirmationProps) {
  const [registration, setRegistration] = useState<RegistrationDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const registrationId = searchParams.get('registrationId')

  useEffect(() => {
    const fetchRegistration = async () => {
      if (!registrationId) {
        setError('Registration ID is missing')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const data = await fetchRegistrationDetails(registrationId)
        setRegistration(data)
        // Trigger confetti animation
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      } catch (error) {
        console.error('Error fetching registration details:', error)
        setError('Failed to load registration details. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRegistration()
  }, [registrationId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-indigo-600"
        >
          Preparing your epic confirmation...
        </motion.div>
      </div>
    )
  }

  if (error || !registration) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-red-500"
        >
          {error || 'Oops! Registration not found. Time for a dance break?'}
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            You're In! 🎉
          </h1>
          <p className="mt-2 text-xl text-gray-600">Get ready for an epic MUN experience!</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-indigo-700">Registration Confirmed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Calendar className="text-indigo-600" />
                <span className="text-lg font-medium">{registration.mun.event_name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="text-indigo-600" />
                <span className="text-lg">Registration ID: {registration.id}</span>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">Your Details:</h3>
                {Object.entries(registration.custom_fields).map(([key, value]) => (
                  <p key={key} className="mb-2 flex items-center">
                    <Check className="text-green-500 mr-2" />
                    <strong className="mr-2">{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}
                  </p>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">Payment Details:</h3>
                <p className="mb-2 flex items-center">
                  <DollarSign className="text-green-500 mr-2" />
                  <strong className="mr-2">Amount:</strong> ₹{registration.payment.amount}
                </p>
                <p className="mb-2 flex items-center">
                  <Check className="text-green-500 mr-2" />
                  <strong className="mr-2">Status:</strong> {registration.payment.status}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-full hover:shadow-lg transition duration-300"
                onClick={() => {
                  // Implement share functionality
                  alert('Sharing is caring! Feature coming soon.')
                }}
              >
                <Share2 className="mr-2" /> Share Your Registration
              </Button>
              <Link href="/dash" passHref>
                <Button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-full hover:bg-indigo-50 transition duration-300">
                  Go to Dashboard
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">What's Next?</h2>
          <p className="text-lg text-gray-600 mb-4">
            Get ready for an unforgettable experience! Don't forget to:
          </p>
          <ul className="list-disc list-inside text-left max-w-md mx-auto text-gray-600">
            <li>Review the MUN schedule</li>
            <li>Prepare your position papers</li>
            <li>Connect with other delegates</li>
            <li>Pack your enthusiasm and diplomacy skills!</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

