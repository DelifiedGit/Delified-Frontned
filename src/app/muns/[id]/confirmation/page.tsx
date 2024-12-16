'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchRegistrationDetails } from '@/lib/api'

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
    return <div className="text-center py-10">Loading confirmation...</div>
  }

  if (error || !registration) {
    return <div className="text-center py-10 text-red-500">{error || 'Registration not found'}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Registration Confirmed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            Thank you for registering for {registration.mun.event_name}. Your registration has been confirmed.
          </p>
          <p className="mb-4">
            Registration ID: {registration.id}
          </p>
          <h3 className="text-xl font-semibold mb-2">Registration Details:</h3>
          {Object.entries(registration.custom_fields).map(([key, value]) => (
            <p key={key} className="mb-2">
              <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}
            </p>
          ))}
        </CardContent>
        <CardFooter>
          <Link href="/dash" passHref>
            <Button>Go to Dashboard</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

