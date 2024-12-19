'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Award, TrendingUp, LogOut, BookOpen, Users, Target, Bell, Zap, DollarSign } from 'lucide-react'
import { logout, fetchDashboardData, DashboardData, MUN, Skill, Notification, Achievement } from '@/lib/api'

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
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0"
      >
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20 ring-2 ring-purple-500">
            <AvatarImage src={dashboardData.user.avatar} alt={dashboardData.user.full_name} />
            <AvatarFallback>{dashboardData.user.full_name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">
              {dashboardData.user.full_name}
            </h1>
            <p className="text-gray-600">{dashboardData.user.institution}</p>
            <p className="text-sm text-gray-500 mt-1">{dashboardData.user.bio}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <QuickStatsCard dashboardData={dashboardData} />
        <SkillsCard skills={dashboardData.skills} />
        <NotificationsCard notifications={dashboardData.notifications} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <AchievementsCard achievements={dashboardData.achievements} />
        {/* <UpcomingMUNCard mun={dashboardData.upcoming_muns[0]} /> */}
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="w-full flex space-x-2 bg-transparent mb-6">
          <TabsTrigger 
            value="upcoming" 
            className="flex-1 bg-white bg-opacity-50 backdrop-blur-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
          >
            Upcoming MUNs
          </TabsTrigger>
          <TabsTrigger 
            value="registered" 
            className="flex-1 bg-white bg-opacity-50 backdrop-blur-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
          >
            Registered MUNs
          </TabsTrigger>
          <TabsTrigger 
            value="past" 
            className="flex-1 bg-white bg-opacity-50 backdrop-blur-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
          >
            Past MUNs
          </TabsTrigger>
        </TabsList>
        <AnimatePresence mode="wait">
          <TabsContent value="upcoming">
            {dashboardData.upcoming_muns.length > 0 ? (
              <MUNGrid muns={dashboardData.upcoming_muns} />
            ) : (
              <div className="text-center py-10 text-purple-600">
                No upcoming MUNs at the moment
              </div>
            )}
          </TabsContent>
          <TabsContent value="registered">
            {dashboardData.registered_muns.length > 0 ? (
              <MUNGrid muns={dashboardData.registered_muns} />
            ) : (
              <div className="text-center py-10 text-purple-600">
                No registered MUNs
              </div>
            )}
          </TabsContent>
          <TabsContent value="past">
            {dashboardData.past_muns.length > 0 ? (
              <MUNGrid muns={dashboardData.past_muns} />
            ) : (
              <div className="text-center py-10 text-purple-600">
                No past MUNs
              </div>
            )}
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}

function QuickStatsCard({ dashboardData }: { dashboardData: DashboardData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-80 border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-600">
            <TrendingUp className="mr-2" /> Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">MUNs Attended</p>
            <p className="text-2xl font-bold">{dashboardData.past_muns.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Upcoming MUNs</p>
            <p className="text-2xl font-bold">{dashboardData.upcoming_muns.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Achievements</p>
            <p className="text-2xl font-bold">{dashboardData.achievements.length}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function SkillsCard({ skills }: { skills: Skill[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-80 border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-indigo-600">
            <BookOpen className="mr-2" /> Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-500">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" indicatorClassName="bg-indigo-500" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function NotificationsCard({ notifications }: { notifications: Notification[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-80 border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-pink-600">
            <Bell className="mr-2" /> Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {notifications.map((notification) => (
              <li key={notification.id} className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Bell className="w-4 h-4 mt-1 text-pink-500" />
                <div>
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function AchievementsCard({ achievements }: { achievements: Achievement[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-80 border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-yellow-600">
            <Award className="mr-2" /> Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {achievements.map((achievement) => (
              <li key={achievement.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Award className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className="font-medium">{achievement.title}</p>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <p className="text-xs text-gray-500">{achievement.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// function UpcomingMUNCard({ mun }: { mun: MUN }) {
//   if (!mun) return null;

//   const eventDate = new Date(mun.date);
//   const now = new Date();
//   const timeLeft = eventDate.getTime() - now.getTime();
//   const daysLeft = Math.ceil(timeLeft / (86400000));

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5, delay: 0.5 }}
//     >
//       <Card className="h-full flex flex-col overflow-hidden bg-white rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
//         <div className="relative aspect-video overflow-hidden">
//           <Image
//             src={mun.image || '/placeholder.jpeg'}
//             alt={mun.event_name}
//             fill
//             className="object-cover transition-transform duration-300 hover:scale-110"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-60" />
//           <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
//             {mun.event_name}
//           </h3>
//         </div>
//         <CardContent className="flex-grow space-y-3 p-4">
//           <div className="flex items-center text-purple-600">
//             <Calendar className="w-5 h-5 mr-2" />
//             <span>{mun.date}</span>
//           </div>
//           <div className="flex items-center text-purple-600">
//             <MapPin className="w-5 h-5 mr-2" />
//             <span>{mun.venue}</span>
//           </div>
//           <div className="flex items-center text-purple-600">
//             <DollarSign className="w-5 h-5 mr-2" />
//             <span className="font-semibold">₹{mun.registration_fees}</span>
//           </div>
//           <div className="flex items-center text-purple-600">
//             <Users className="w-5 h-5 mr-2" />
//             <span>{mun.participants || 'TBA participants'}</span>
//           </div>
//           <div className="mt-4">
//             <p className="text-sm font-medium text-purple-600">Countdown</p>
//             <p className="text-2xl font-bold text-purple-900">{daysLeft} days left</p>
//           </div>
//         </CardContent>
//         <CardFooter className="p-4">
//           <Link href={`/muns/${mun.id}`} className="w-full">
//             <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform hover:-translate-y-1">
//               View Details
//             </Button>
//           </Link>
//         </CardFooter>
//       </Card>
//     </motion.div>
//   )
// }

function MUNGrid({ muns }: { muns: MUN[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {muns.map((mun, index) => (
        <motion.div
          key={mun.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <MUNCard mun={mun} />
        </motion.div>
      ))}
    </motion.div>
  )
}

function MUNCard({ mun }: { mun: MUN }) {
  return (
    <Card className="h-full flex flex-col overflow-hidden bg-white rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={mun.image || '/placeholder.jpeg'}
          alt={mun.event_name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-60" />
        <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
          {mun.event_name}
        </h3>
      </div>
      <CardContent className="flex-grow space-y-3 p-4">
        <div className="flex items-center text-purple-600">
          <Calendar className="w-5 h-5 mr-2" />
          <span>{mun.date}</span>
        </div>
        <div className="flex items-center text-purple-600">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{mun.venue}</span>
        </div>
        <div className="flex items-center text-purple-600">
          <DollarSign className="w-5 h-5 mr-2" />
          <span className="font-semibold">₹{mun.registration_fees}</span>
        </div>
        <div className="flex items-center text-purple-600">
          <Users className="w-5 h-5 mr-2" />
          <span>{mun.participants || 'TBA participants'}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Link href={`/muns/${mun.id}`} className="w-full">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform hover:-translate-y-1">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

