'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, MapPin, Users } from 'lucide-react'

interface MUN {
  id: string
  title: string
  date: string
  venue: string
  image: string
  status: 'upcoming' | 'ongoing' | 'past'
}

interface UserProfile {
  name: string
  email: string
  institution: string
}

export default function DashboardPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [pastMUNs, setPastMUNs] = useState<MUN[]>([])
  const [registeredMUNs, setRegisteredMUNs] = useState<MUN[]>([])
  const [upcomingMUNs, setUpcomingMUNs] = useState<MUN[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch user profile
        const profileResponse = await fetch('/api/user/profile')
        if (!profileResponse.ok) throw new Error('Failed to fetch user profile')
        const profileData = await profileResponse.json()
        setUserProfile(profileData)

        // Fetch MUNs data
        const munsResponse = await fetch('/api/muns/dashboard')
        if (!munsResponse.ok) throw new Error('Failed to fetch MUNs data')
        const munsData = await munsResponse.json()
        setPastMUNs(munsData.past)
        setRegisteredMUNs(munsData.registered)
        setUpcomingMUNs(munsData.upcoming)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {userProfile?.name}</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Name:</strong> {userProfile?.name}</p>
            <p><strong>Email:</strong> {userProfile?.email}</p>
            <p><strong>Institution:</strong> {userProfile?.institution}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Edit Profile</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>MUNs Attended</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{pastMUNs.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming MUNs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{registeredMUNs.length}</p>
          </CardContent>
          <CardFooter>
            <Link href="/muns" passHref>
              <Button variant="outline" className="w-full">Explore More MUNs</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="registered" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="registered">Registered MUNs</TabsTrigger>
          <TabsTrigger value="past">Past MUNs</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming MUNs</TabsTrigger>
        </TabsList>
        <TabsContent value="registered">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registeredMUNs.map((mun) => (
              <MUNCard key={mun.id} mun={mun} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastMUNs.map((mun) => (
              <MUNCard key={mun.id} mun={mun} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMUNs.map((mun) => (
              <MUNCard key={mun.id} mun={mun} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MUNCard({ mun }: { mun: MUN }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{mun.title}</CardTitle>
        <CardDescription>{mun.status}</CardDescription>
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
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/muns/${mun.id}`} passHref>
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}