'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface ConfirmationProps {
  params: { id: string }
}

interface MUNEvent {
  id: string
  title: string
}

export default function ConfirmationPage({ params }: ConfirmationProps) {
  const [munEvent, setMunEvent] = useState<MUNEvent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      } catch (error) {
        console.error('Error fetching MUN event:', error)
        setError('Failed to load MUN details. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMUNEvent()
  }, [params.id])

  if (isLoading) {
    return <div className="text-center py-10">Loading confirmation...</div>
  }

  if (error || !munEvent) {
    return <div className="text-center py-10 text-red-500">{error || 'MUN not found'}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Registration Confirmed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            Thank you for registering for {munEvent.title}. Your registration has been confirmed.
          </p>
          <p className="mb-4">
            You will receive an email with further details and instructions shortly.
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard" passHref>
            <Button>Go to Dashboard</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}