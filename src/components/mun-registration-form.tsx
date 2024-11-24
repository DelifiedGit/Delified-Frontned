'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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

interface RegistrationFormProps {
  munTitle: string
  munId: string
  price: number
  customFields?: { [key: string]: string | string[] }
}

export function MunRegistrationForm({ munTitle, munId, price, customFields }: RegistrationFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<{ [key: string]: string | string[] }>({})
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
    try {
      const response = await fetch('/api/muns/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          munId,
          ...formData,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to register for MUN')
      }

      const registration = await response.json()
      console.log('Registration successful:', registration)
      setIsOpen(false)
      router.push(`/muns/${munId}/checkout`)
    } catch (error) {
      console.error('Error registering for MUN:', error)
      // TODO: Show error message to user
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Register Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register for {munTitle}</DialogTitle>
          <DialogDescription>
            Fill out the form below to register for this MUN.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {customFields && Object.entries(customFields).map(([key, field]) => (
            <div key={key}>
              <Label htmlFor={key}>{key}</Label>
              {Array.isArray(field) ? (
                field.length > 3 ? (
                  <Select onValueChange={(value) => handleInputChange(key, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${key}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.map((option, index) => (
                        <SelectItem key={index} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : field.length > 1 ? (
                  <div className="space-y-2">
                    {field.map((option, index) => (
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
                    {field.map((option, index) => (
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
                  value={formData[key] as string}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  required
                />
              )}
            </div>
          ))}
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name as string || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email as string || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <span>Price: ₹{price}</span>
            <Button type="submit">Proceed to Checkout</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}