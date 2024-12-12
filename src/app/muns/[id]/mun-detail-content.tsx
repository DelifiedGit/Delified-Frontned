'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Calendar, MapPin } from 'lucide-react'
import { MunRegistrationForm } from '@/components/mun-registration-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchMUNById } from '@/lib/api'

interface CustomField {
  type: 'text' | 'number' | 'dropdown'
  value?: string | number
  options?: string[]
}

interface MUNEvent {
  id: string
  event_name: string
  date: string
  venue: string
  registration_fees: number
  custom_fields?: { [key: string]: CustomField }
}

export default function MUNDetailContent({ id }: { id: string }) {
  const [munEvent, setMunEvent] = useState<MUNEvent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMUNEvent = async () => {
      try {
        setIsLoading(true)
        const event = await fetchMUNById(id)
        setMunEvent(event)
      } catch (error) {
        console.log('Error fetching MUN event:', error)
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
            src={'/placeholder.jpeg'}
            alt={munEvent.event_name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{munEvent.event_name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>{munEvent.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>{munEvent.venue}</span>
            </div>
          </div>
          {munEvent.custom_fields && Object.keys(munEvent.custom_fields).length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.entries(munEvent.custom_fields).map(([key, field]) => (
                  <div key={key} className="mb-2">
                    <strong>{key}:</strong>{' '}
                    {field.type === 'dropdown' ? (
                      <span>{field.options?.join(', ') || ''}</span>
                    ) : (
                      <span>{field.value || ''}</span>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-[#4763FF]">₹{munEvent.registration_fees}</span>
            <MunRegistrationForm 
              munTitle={munEvent.event_name} 
              munId={munEvent.id} 
              price={munEvent.registration_fees} 
              customFields={munEvent.custom_fields || {}} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

