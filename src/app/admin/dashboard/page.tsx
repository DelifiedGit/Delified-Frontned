'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from '@/components/admin/UserManagement'
import { EventManagement } from '@/components/admin/EventManagement'
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard'
import { ContentManagement } from '@/components/admin/ContentManagement'
import { NotificationCenter } from '@/components/admin/NotificationCenter'
import { APIManagement } from '@/components/admin/APIManagement'
import { FeedbackSupport } from '@/components/admin/FeedbackSupport'
import { AuditLogs } from '@/components/admin/AuditLogs'
import { Settings } from '@/components/admin/Settings'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userRole, setUserRole] = useState('')
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          credentials: 'include',
        })
        if (response.ok) {
          const data = await response.json()
          setIsAuthenticated(true)
          setUserRole(data.role)
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
        <div>
          <span className="mr-4">Role: {userRole}</span>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
      <Tabs defaultValue="user-management" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9">
          <TabsTrigger value="user-management">Users</TabsTrigger>
          <TabsTrigger value="event-management">Events</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="content-management">Content</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api-management">API</TabsTrigger>
          <TabsTrigger value="feedback-support">Support</TabsTrigger>
          <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="user-management">
          <UserManagement userRole={userRole} />
        </TabsContent>
        <TabsContent value="event-management">
          <EventManagement userRole={userRole} />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsDashboard userRole={userRole} />
        </TabsContent>
        <TabsContent value="content-management">
          <ContentManagement userRole={userRole} />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationCenter userRole={userRole} />
        </TabsContent>
        <TabsContent value="api-management">
          <APIManagement userRole={userRole} />
        </TabsContent>
        <TabsContent value="feedback-support">
          <FeedbackSupport userRole={userRole} />
        </TabsContent>
        <TabsContent value="audit-logs">
          <AuditLogs userRole={userRole} />
        </TabsContent>
        <TabsContent value="settings">
          <Settings userRole={userRole} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

