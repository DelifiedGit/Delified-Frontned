'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Calendar, MapPin, Users, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MunRegistrationForm } from '@/components/mun-registration-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MUNEvent {
  id: string
  title: string
  date: string
  venue: string
  registerBy: string
  price: number
  image: string
  type: string
  description: string
  committees: string[]
  schedule: { day: string; events: { time: string; event: string }[] }[]
  customFields?: { [key: string]: string | string[] }
}

const getMUNEvent = async (id: string): Promise<MUNEvent> => {
  const response = await fetch(`/api/muns/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch MUN event')
  }
  return response.json()
}

export default function MUNDetailContent({ id }: { id: string }) {
  const [munEvent, setMunEvent] = useState<MUNEvent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMUNEvent = async () => {
      try {
        setIsLoading(true)
        const event = await getMUNEvent(id)
        setMunEvent(event)
      } catch (error) {
        console.error('Error fetching MUN event:', error)
        setError('Failed to load MUN details. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMUNEvent()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
        <div className="text-lg">Loading MUN details...</div>
      </div>
    )
  }

  if (error || !munEvent) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
        <div className="text-lg text-red-500">{error || 'MUN not found'}</div>
      </div>
    )
  }

  return (
    <div className="bg-[#F8F9FB] min-h-screen">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative aspect-video">
          <Image
            src={munEvent.image || '/placeholder.jpeg'}
            alt={munEvent.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{munEvent.title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>{munEvent.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>{munEvent.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-500" />
              <span>{munEvent.type} event</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span>Register by: {munEvent.registerBy}</span>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">About the Event</h2>
            <p>{munEvent.description}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Committees</h2>
            <ul className="list-disc list-inside">
              {munEvent.committees.map((committee, index) => (
                <li key={index}>{committee}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Schedule</h2>
            {munEvent.schedule.map((day, dayIndex) => (
              <div key={dayIndex} className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{day.day}</h3>
                <ul className="space-y-2">
                  {day.events.map((event, eventIndex) => (
                    <li key={eventIndex} className="flex">
                      <span className="font-medium w-40">{event.time}</span>
                      <span>{event.event}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {munEvent.customFields && Object.keys(munEvent.customFields).length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.entries(munEvent.customFields).map(([key, value]) => (
                  <div key={key} className="mb-2">
                    <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-[#4763FF]">₹{munEvent.price}</span>
            <MunRegistrationForm munTitle={munEvent.title} munId={munEvent.id} price={munEvent.price} customFields={munEvent.customFields} />
          </div>
        </div>
      </div>
    </div>
  )
}