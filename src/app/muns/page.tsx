'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, MapPin, Users, DollarSign, Search, Filter, X, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { FadeInView, StaggerParent } from '@/components/ui/animations'
import { fetchMUNs } from '@/lib/api'

interface MUN {
  id: string
  event_name: string
  date: string
  venue: string
  registration_fees: number
  custom_fields?: { [key: string]: string | string[] }
}

export default function MUNsList() {
  const [muns, setMuns] = useState<MUN[]>([])
  const [filteredMuns, setFilteredMuns] = useState<MUN[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [maxFee, setMaxFee] = useState(10000)
  const [selectedVenues, setSelectedVenues] = useState<string[]>([])

  useEffect(() => {
    const loadMUNs = async () => {
      try {
        setIsLoading(true)
        const data = await fetchMUNs()
        setMuns(data)
        setFilteredMuns(data)
      } catch (error) {
        console.log('Error fetching MUNs:', error)
        setError('Failed to load MUNs. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    loadMUNs()
  }, [])

  useEffect(() => {
    const filtered = muns.filter(mun =>
      (mun.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mun.venue.toLowerCase().includes(searchTerm.toLowerCase())) &&
      mun.registration_fees <= maxFee &&
      (selectedVenues.length === 0 || selectedVenues.includes(mun.venue))
    )
    setFilteredMuns(filtered)
  }, [searchTerm, muns, maxFee, selectedVenues])

  const venues = Array.from(new Set(muns.map(mun => mun.venue)))

  const toggleVenue = (venue: string) => {
    setSelectedVenues(prev => 
      prev.includes(venue) 
        ? prev.filter(v => v !== venue)
        : [...prev, venue]
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
          className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <FadeInView>
          <div className="text-center py-10 text-red-500 text-2xl font-bold">{error}</div>
        </FadeInView>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <FadeInView>
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
          Discover Exciting MUNs
        </h1>
      </FadeInView>
      <div className="max-w-7xl mx-auto space-y-8">
        <FadeInView>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Search MUNs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-purple-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 bg-white text-gray-800 placeholder-gray-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white text-purple-700 hover:bg-purple-100 rounded-full"
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </FadeInView>

        <AnimatePresence>
          {showFilters && (
            <FadeInView>
              <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Registration Fee: ₹{maxFee}
                  </label>
                  <Slider
                    min={0}
                    max={10000}
                    step={100}
                    value={[maxFee]}
                    onValueChange={(value) => setMaxFee(value[0])}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Venue:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {venues.map(venue => (
                      <Badge
                        key={venue}
                        variant={selectedVenues.includes(venue) ? 'default' : 'outline'}
                        className="cursor-pointer transition-all duration-300 hover:scale-105"
                        onClick={() => toggleVenue(venue)}
                      >
                        {venue}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInView>
          )}
        </AnimatePresence>

        <StaggerParent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMuns.map((mun) => (
              <FadeInView key={mun.id}>
                <Card className="h-full flex flex-col overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg">
                  <CardHeader className="relative pb-0">
                    <div className="relative aspect-video mb-4 overflow-hidden rounded-t-xl">
                      <Image
                        src={'/placeholder.jpeg'}
                        alt={mun.event_name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-60"></div>
                      <CardTitle className="absolute bottom-4 left-4 text-white text-xl font-bold">{mun.event_name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                        <span>{mun.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-2 text-purple-500" />
                        <span>{mun.venue}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="w-5 h-5 mr-2 text-purple-500" />
                        <span className="font-semibold">₹{mun.registration_fees}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-5 h-5 mr-2 text-purple-500" />
                        <span>{mun.custom_fields?.participants || 'TBA'} participants</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/muns/${mun.id}`} passHref className="w-full">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </FadeInView>
            ))}
          </div>
        </StaggerParent>
      </div>
    </div>
  )
}

