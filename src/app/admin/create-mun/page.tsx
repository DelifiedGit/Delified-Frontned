'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MunCreationForm } from '@/components/mun-creation-form'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

export default function CreateMUNPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check')
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        toast({
          title: 'Authentication Error',
          description: 'Please log in to access this page.',
          variant: 'destructive',
        })
        router.push('/login')
      }
    }

    checkAuth()
  }, [router])

  if (!isAuthenticated) {
    return <div>Checking authentication...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create a New MUN</h1>
      <MunCreationForm />
      <div className="mt-4">
        <Button variant="outline" onClick={() => router.push('/admin/dashboard')}>
          Back to Admin Dashboard
        </Button>
      </div>
    </div>
  )
}