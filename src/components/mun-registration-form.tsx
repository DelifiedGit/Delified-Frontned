'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X, User, Mail, Building } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import toast from 'react-hot-toast'

interface RegistrationFormProps {
  munTitle: string
  munId: string
  price: number
  customFields?: { [key: string]: CustomField }
}

interface CustomField {
  type: 'text' | 'number' | 'dropdown'
  value?: string | number
  options?: string[]
}

export function MunRegistrationForm({ munTitle, munId, price, customFields }: RegistrationFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    institution: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        toast.error('Please log in to register for this event.')
        router.push(`/login?redirect=/muns/${munId}`)
        return
      }
      router.push(`/muns/${munId}/checkout?formData=${encodeURIComponent(JSON.stringify(formData))}`)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to proceed to checkout. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg">
          Register Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 bg-gradient-to-br from-purple-600 to-indigo-800 border-none">
        <div className="p-6">
          <DialogHeader className="mb-6">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl font-bold text-white">
                Register for {munTitle}
              </DialogTitle>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-gray-200 mt-2">
              Fill out the form below to register for this exciting MUN event!
            </p>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">
                  Full Name
                </Label>
                <div className="relative">
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white"
                    placeholder="Enter your full name"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="institution" className="text-white">
                  Institution
                </Label>
                <div className="relative">
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => handleInputChange('institution', e.target.value)}
                    required
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white"
                    placeholder="Enter your institution"
                  />
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                </div>
              </div>
            </motion.div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white hover:bg-white/90 text-indigo-600 font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg"
              >
                {isSubmitting ? 'Processing...' : 'Proceed to Checkout'}
              </Button>
              <p className="text-center text-white/80 text-sm mt-4">
                Registration Fee: ₹{typeof price === 'number' ? price.toFixed(2) : price}
              </p>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

