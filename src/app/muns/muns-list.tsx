'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, MapPin } from 'lucide-react'

interface MUN {
  id: string
  title: string
  date: string
  venue: string
  price: number
  image: string
  type: string
  customFields?: { [key: string]: string | string[] }
}

export default function MUNsList() {
  const [muns, setMuns] = useState<MUN[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMUNs = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/muns')
        if (!response.ok) {
          throw new Error('Failed to fetch MUNs')
        }
        const data = await response.json()
        setMuns(data)
      } catch (error) {
        console.error('Error fetching MUNs:', error)
        setError('Failed to load MUNs. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMUNs()
  }, [])

  if (isLoading) {
    return <div className="text-center py-10">Loading MUNs...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {muns.map((mun) => (
        <Card key={mun.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{mun.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="relative aspect-video mb-4">
              <Image
                src={mun.image || '/placeholder.jpeg'}
                alt={mun.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{mun.date}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{mun.venue}</span>
              </div>
              <div>
                <span className="font-bold">₹{mun.price}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/muns/${mun.id}`} passHref>
              <Button className="w-full">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}