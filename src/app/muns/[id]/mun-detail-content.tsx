'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, DollarSign, Globe, Award } from 'lucide-react'
import { MunRegistrationForm } from '@/components/mun-registration-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
  description: string
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    )
  }

  if (error || !munEvent) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-lg text-red-500">{error || 'MUN not found'}</div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="overflow-hidden shadow-lg">
        <div className="relative aspect-video">
          <Image
            src={'/placeholder.jpeg'}
            alt={munEvent.event_name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute bottom-4 left-4 text-white"
          >
            <h1 className="text-4xl font-bold mb-2">{munEvent.event_name}</h1>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {munEvent.date}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {munEvent.venue}
              </Badge>
            </div>
          </motion.div>
        </div>
        <CardContent className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
            <p className="text-gray-600 mb-6">{munEvent.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-purple-600 mr-2" />
                <span>500+ Participants</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-5 h-5 text-purple-600 mr-2" />
                <span>International Event</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 text-purple-600 mr-2" />
                <span>Certificates Provided</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-semibold">₹{munEvent.registration_fees}</span>
              </div>
            </div>
          </motion.div>
          {munEvent.custom_fields && Object.keys(munEvent.custom_fields).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(munEvent.custom_fields).map(([key, field]) => (
                  <div key={key} className="mb-2">
                    <strong className="text-purple-600">{key}:</strong>{' '}
                    {field.type === 'dropdown' ? (
                      <span>{field.options?.join(', ') || ''}</span>
                    ) : (
                      <span>{field.value || ''}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8"
          >
            <MunRegistrationForm
              munTitle={munEvent.event_name}
              munId={munEvent.id}
              price={munEvent.registration_fees}
              customFields={munEvent.custom_fields || {}}
            />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

