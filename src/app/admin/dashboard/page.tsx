'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          credentials: 'include', // This ensures cookies are sent with the request
        })
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          throw new Error('Not authenticated')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        toast({
          title: 'Authentication Error',
          description: 'Please log in to access this page.',
          variant: 'destructive',
        })
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      if (response.ok) {
        toast({
          title: 'Logout Successful',
          description: 'You have been logged out.',
        })
        router.push('/')
      } else {
        throw new Error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
      toast({
        title: 'Logout Failed',
        description: 'An error occurred during logout. Please try again.',
        variant: 'destructive',
      })
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Checking authentication...</div>
  }

  if (!isAuthenticated) {
    return null // The useEffect will redirect to login page
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>MUN Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/admin/create-mun" passHref>
              <Button>Create New MUN</Button>
            </Link>
          </CardContent>
        </Card>
        {/* Add more admin features here */}
      </div>
    </div>
  )
}