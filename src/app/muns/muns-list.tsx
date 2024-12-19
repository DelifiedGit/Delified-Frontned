'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, MapPin, Users, DollarSign, Search, Filter, X } from 'lucide-react'
import { fetchMUNs } from '@/lib/api'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'

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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-1/2">
          <Input
            type="text"
            placeholder="Search MUNs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-purple-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 bg-white bg-opacity-20 text-white placeholder-purple-200"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-200" />
        </div>
        <Button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-white text-purple-700 hover:bg-purple-100"
        >
          <Filter className="mr-2 h-4 w-4" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
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
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Filter by Venue:
                </label>
                <div className="flex flex-wrap gap-2">
                  {venues.map(venue => (
                    <Badge
                      key={venue}
                      variant={selectedVenues.includes(venue) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleVenue(venue)}
                    >
                      {venue}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredMuns.map((mun, index) => (
          <motion.div
            key={mun.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white">
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
                  <div className="flex items-center text-purple-200">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{mun.date}</span>
                  </div>
                  <div className="flex items-center text-purple-200">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{mun.venue}</span>
                  </div>
                  <div className="flex items-center text-purple-200">
                    <DollarSign className="w-5 h-5 mr-2" />
                    <span className="font-semibold">₹{mun.registration_fees}</span>
                  </div>
                  <div className="flex items-center text-purple-200">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{mun.custom_fields?.participants || 'TBA'} participants</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/muns/${mun.id}`} passHref className="w-full">
                  <Button className="w-full bg-white text-purple-700 hover:bg-purple-100 font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

