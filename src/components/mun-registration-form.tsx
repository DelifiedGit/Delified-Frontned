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
import { processPayment } from '@/lib/api'

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
  const [error, setError] = useState<string | null>(null)
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
    setError(null)
    setIsSubmitting(true)
    try {
      const payment = await processPayment({
        munId,
        amount: price,
      })
      
      console.log('Payment successful:', payment)
      setIsOpen(false)
      router.push(`/muns/${munId}/checkout?paymentId=${payment.payment_id}&formData=${encodeURIComponent(JSON.stringify(formData))}`)
    } catch (error) {
      console.error('Error processing payment:', error)
      setError('Payment failed. Please try again.')
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-600">Register for {munTitle}</DialogTitle>
          <DialogDescription>
            Fill out the form below to register for this exciting MUN event!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence>
            {customFields && Object.entries(customFields).map(([key, field], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Label htmlFor={key} className="text-purple-600">{key}</Label>
                {field.type === 'dropdown' && field.options ? (
                  field.options.length > 3 ? (
                    <Select onValueChange={(value) => handleInputChange(key, value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={`Select ${key}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map((option, index) => (
                          <SelectItem key={index} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.options.length > 1 ? (
                    <div className="space-y-2">
                      {field.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${key}-${index}`}
                            checked={(formData[key] as string[] || []).includes(option)}
                            onCheckedChange={(checked) => handleCheckboxChange(key, option, checked as boolean)}
                          />
                          <Label htmlFor={`${key}-${index}`}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <RadioGroup onValueChange={(value) => handleInputChange(key, value)}>
                      {field.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`${key}-${index}`} />
                          <Label htmlFor={`${key}-${index}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )
                ) : (
                  <Input
                    id={key}
                    type={field.type === 'number' ? 'number' : 'text'}
                    value={formData[key] as string}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    required
                    className="w-full"
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Label htmlFor="name" className="text-purple-600">Full Name</Label>
            <Input
              id="name"
              value={formData.name as string || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              className="w-full"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <Label htmlFor="email" className="text-purple-600">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email as string || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              className="w-full"
            />
          </motion.div>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-500"
            >
              {error}
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="flex justify-between items-center"
          >
            <span className="text-lg font-semibold text-purple-600">Price: ₹{price}</span>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg"
            >
              {isSubmitting ? 'Processing...' : 'Proceed to Checkout'}
            </Button>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

