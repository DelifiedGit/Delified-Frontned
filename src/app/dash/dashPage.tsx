'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, MapPin, Users } from 'lucide-react'
import { logout, fetchDashboardData } from '@/lib/api'

interface MUN {
  id: string
  event_name: string
  date: string
  venue: string
  image: string
}

interface UserProfile {
  full_name: string
  email: string
  institution: string
}

interface DashboardData {
  user: UserProfile
  past_muns: MUN[]
  registered_muns: MUN[]
  upcoming_muns: MUN[]
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        if (!token) {
          router.push('/login')
          return
        }

        const data = await fetchDashboardData()
        setDashboardData(data)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [router])

  const handleLogout = async () => {
    try {
      await logout()
      localStorage.removeItem('auth_token')
      // Dispatch a custom event to notify other components of the logout
      window.dispatchEvent(new Event('storage'))
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!dashboardData) {
    return <div className="flex justify-center items-center h-screen">Error loading dashboard data</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {dashboardData.user.full_name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Name:</strong> {dashboardData.user.full_name}</p>
            <p><strong>Email:</strong> {dashboardData.user.email}</p>
            <p><strong>Institution:</strong> {dashboardData.user.institution}</p>
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
            <p className="text-3xl font-bold">{dashboardData.past_muns.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming MUNs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dashboardData.registered_muns.length}</p>
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
            {dashboardData.registered_muns.map((mun) => (
              <MUNCard key={mun.id} mun={mun} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData.past_muns.map((mun) => (
              <MUNCard key={mun.id} mun={mun} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData.upcoming_muns.map((mun) => (
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
        <CardTitle>{mun.event_name}</CardTitle>

      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative aspect-video mb-4">
          <Image
            src={mun.image || '/placeholder.jpeg'}
            alt={mun.event_name}
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

