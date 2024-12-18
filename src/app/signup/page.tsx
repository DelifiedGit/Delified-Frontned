'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { signUp } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, User, Mail, Key, Calendar, Phone, Building, Globe2, Users, Trophy, ChevronRight, ChevronLeft } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

const testimonials = [
  {
    quote: "Delified opened doors to international diplomacy I never knew existed.",
    author: "Sarah Chen",
    role: "Harvard MUN Delegate"
  },
  {
    quote: "The platform's resources helped me win Best Delegate at HMUN 2023.",
    author: "James Rodriguez",
    role: "Yale MUN Society"
  },
  {
    quote: "A game-changer for aspiring diplomats and global leaders.",
    author: "Aisha Patel",
    role: "Oxford Union Debater"
  }
]

const stats = [
  { number: "50+", label: "Countries", icon: Globe2 },
  { number: "10K+", label: "Active Members", icon: Users },
  { number: "200+", label: "MUN Events", icon: Trophy }
]

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    username: '',
    gender: '',
    date_of_birth: '',
    contact_number: '',
    institution: '',
    password: '',
  })
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await signUp(formData)
      localStorage.setItem('auth_token', response.token)
      toast.success('Sign up successful! Redirecting to login...')
      setTimeout(() => router.push('/login'), 2000)
    } catch (error) {
      toast.error('Sign up failed. Please try again.')
    }
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between text-white">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold mb-6"
              >
                Join Delified
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-200 mb-8"
              >
                Step into a world of global diplomacy and leadership. Connect with future changemakers from around the globe.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center p-4 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <div className="relative h-48">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                    <p className="text-lg mb-4 italic">"{testimonials[currentTestimonial].quote}"</p>
                    <p className="font-semibold">{testimonials[currentTestimonial].author}</p>
                    <p className="text-sm text-gray-300">{testimonials[currentTestimonial].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevTestimonial}
                  className="text-white hover:bg-white hover:bg-opacity-10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextTestimonial}
                  className="text-white hover:bg-white hover:bg-opacity-10"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-300">
                Already have an account?{' '}
                <Link href="/login" className="text-white hover:text-indigo-200 font-semibold transition duration-300 ease-in-out">
                  Log in
                </Link>
              </p>
            </div>
          </div>

          <div className="md:w-1/2 bg-white p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    required
                    className="pl-10 bg-gray-50 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-sm font-medium text-gray-700">Full Name</Label>
                <div className="relative">
                  <Input
                    id="full_name"
                    name="full_name"
                    onChange={handleChange}
                    required
                    className="pl-10 bg-gray-50 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">Username</Label>
                <div className="relative">
                  <Input
                    id="username"
                    name="username"
                    onChange={handleChange}
                    required
                    className="pl-10 bg-gray-50 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender</Label>
                <Input
                  id="gender"
                  name="gender"
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date_of_birth" className="text-sm font-medium text-gray-700">Date of Birth</Label>
                <div className="relative">
                  <Input
                    id="date_of_birth"
                    name="date_of_birth"
                    type="date"
                    onChange={handleChange}
                    required
                    className="pl-10 bg-gray-50 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_number" className="text-sm font-medium text-gray-700">Contact Number</Label>
                <div className="relative">
                  <Input
                    id="contact_number"
                    name="contact_number"
                    onChange={handleChange}
                    required
                    className="pl-10 bg-gray-50 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution" className="text-sm font-medium text-gray-700">Institution</Label>
                <div className="relative">
                  <Input
                    id="institution"
                    name="institution"
                    onChange={handleChange}
                    required
                    className="pl-10 bg-gray-50 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    required
                    className="pl-10 bg-gray-50 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                Sign Up <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

