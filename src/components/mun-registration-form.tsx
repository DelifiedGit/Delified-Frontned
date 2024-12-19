'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ArrowRight, User, Mail, Calendar, Building } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

interface CustomField {
  type: 'text' | 'number' | 'dropdown'
  value?: string | number
  options?: string[]
}

interface RegistrationFormProps {
  munTitle: string
  munId: string
  price: number
  customFields?: { [key: string]: CustomField }
}

export function MunRegistrationForm({ munTitle, munId, price, customFields }: RegistrationFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<{ [key: string]: string | string[] }>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleInputChange = (key: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleCheckboxChange = (key: string, option: string, checked: boolean) => {
    setFormData(prev => {
      const currentValue = prev[key] as string[] || []
      if (checked) {
        return { ...prev, [key]: [...currentValue, option] }
      } else {
        return { ...prev, [key]: currentValue.filter(item => item !== option) }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Instead of processing payment, redirect to checkout page
      router.push(`/muns/${munId}/checkout?formData=${encodeURIComponent(JSON.stringify(formData))}`)
    } catch (error) {
      console.error('Error redirecting to checkout:', error)
      toast.error('Failed to proceed to checkout. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, Object.keys(customFields || {}).length))
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const renderFormFields = () => {
    const fields = Object.entries(customFields || {})
    if (currentStep < fields.length) {
      const [key, field] = fields[currentStep]
      return (
        <motion.div
          key={key}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Label htmlFor={key} className="text-lg font-semibold text-gray-700 mb-2 block">{key}</Label>
          {field.type === 'dropdown' && field.options ? (
            <Select onValueChange={(value) => handleInputChange(key, value)}>
              <SelectTrigger className="w-full bg-white bg-opacity-20 backdrop-blur-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                <SelectValue placeholder={`Select ${key}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((option, index) => (
                  <SelectItem key={index} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : field.type === 'number' ? (
            <Input
              id={key}
              type="number"
              value={formData[key] as string}
              onChange={(e) => handleInputChange(key, e.target.value)}
              required
              className="w-full bg-white bg-opacity-20 backdrop-blur-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          ) : (
            <Input
              id={key}
              type="text"
              value={formData[key] as string}
              onChange={(e) => handleInputChange(key, e.target.value)}
              required
              className="w-full bg-white bg-opacity-20 backdrop-blur-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          )}
        </motion.div>
      )
    } else {
      return (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg font-semibold text-gray-700">Full Name</Label>
            <div className="relative">
              <Input
                id="name"
                value={formData.name as string || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="pl-10 bg-white bg-opacity-20 backdrop-blur-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg font-semibold text-gray-700">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={formData.email as string || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="pl-10 bg-white bg-opacity-20 backdrop-blur-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="institution" className="text-lg font-semibold text-gray-700">Institution</Label>
            <div className="relative">
              <Input
                id="institution"
                value={formData.institution as string || ''}
                onChange={(e) => handleInputChange('institution', e.target.value)}
                required
                className="pl-10 bg-white bg-opacity-20 backdrop-blur-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </motion.div>
      )
    }
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg">
            Register Now
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Register for {munTitle}</DialogTitle>
            <DialogDescription className="text-gray-200">
              Fill out the form below to register for this exciting MUN event!
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {renderFormFields()}
            </AnimatePresence>
            <div className="flex justify-between items-center mt-6">
              {currentStep > 0 && (
                <Button type="button" onClick={prevStep} variant="outline" className="bg-white bg-opacity-20 text-white hover:bg-opacity-30">
                  Previous
                </Button>
              )}
              {currentStep < Object.keys(customFields || {}).length ? (
                <Button type="button" onClick={nextStep} className="bg-white text-indigo-600 hover:bg-gray-100">
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg"
                >
                  {isSubmitting ? 'Processing...' : 'Proceed to Checkout'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-300">Registration Fee: ₹{price}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

