'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'

type FieldType = 'text' | 'number' | 'dropdown' | 'checkbox' | 'radio'

interface CustomField {
  id: string
  type: FieldType
  label: string
  options?: string[]
}

export function MunCreationForm() {
  const [eventName, setEventName] = useState('')
  const [date, setDate] = useState('')
  const [venue, setVenue] = useState('')
  const [registrationFees, setRegistrationFees] = useState('')
  const [customFields, setCustomFields] = useState<CustomField[]>([])
  const [newFieldType, setNewFieldType] = useState<FieldType>('text')
  const router = useRouter()

  const addCustomField = () => {
    const newField: CustomField = {
      id: Date.now().toString(),
      type: newFieldType,
      label: `New ${newFieldType} field`,
      options: newFieldType === 'dropdown' || newFieldType === 'checkbox' || newFieldType === 'radio' ? ['Option 1'] : undefined,
    }
    setCustomFields([...customFields, newField])
  }

  const updateCustomField = (id: string, updates: Partial<CustomField>) => {
    setCustomFields(customFields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ))
  }

  const removeCustomField = (id: string) => {
    setCustomFields(customFields.filter(field => field.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formData = {
        eventName,
        date,
        venue,
        registrationFees,
        customFields,
      }
      const response = await fetch('/api/muns/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to create MUN')
      }

      const newMun = await response.json()
      console.log('Form submitted:', newMun)
      toast({
        title: 'MUN Created',
        description: `Successfully created ${newMun.eventName}`,
      })
      router.push('/muns')
    } catch (error) {
      console.error('Error creating MUN:', error)
      toast({
        title: 'Error',
        description: 'Failed to create MUN. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">List Your MUN</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="eventName">Event Name</Label>
          <Input
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="venue">Venue</Label>
          <Input
            id="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="registrationFees">Registration Fees</Label>
          <Input
            id="registrationFees"
            type="number"
            value={registrationFees}
            onChange={(e) => setRegistrationFees(e.target.value)}
            required
          />
        </div>

        {customFields.map((field) => (
          <Card key={field.id}>
            <CardHeader>
              <CardTitle>{field.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Input
                  value={field.label}
                  onChange={(e) => updateCustomField(field.id, { label: e.target.value })}
                  placeholder="Field Label"
                />
                {(field.type === 'dropdown' || field.type === 'checkbox' || field.type === 'radio') && (
                  <div>
                    <Label>Options</Label>
                    {field.options?.map((option, index) => (
                      <Input
                        key={index}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(field.options || [])]
                          newOptions[index] = e.target.value
                          updateCustomField(field.id, { options: newOptions })
                        }}
                        className="mt-1"
                      />
                    ))}
                    <Button
                      type="button"
                      onClick={() => updateCustomField(field.id, { options: [...(field.options || []), ''] })}
                      className="mt-2"
                    >
                      Add Option
                    </Button>
                  </div>
                )}
                <Button type="button" onClick={() => removeCustomField(field.id)} variant="destructive">
                  Remove Field
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <div>
          <Label>Add Custom Field</Label>
          <Select onValueChange={(value: FieldType) => setNewFieldType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select field type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="dropdown">Dropdown</SelectItem>
              <SelectItem value="checkbox">Checkbox</SelectItem>
              <SelectItem value="radio">Radio</SelectItem>
            </SelectContent>
          </Select>
          <Button type="button" onClick={addCustomField} className="mt-2">
            Add Field
          </Button>
        </div>

        <Button type="submit">Submit MUN Listing</Button>
      </form>
    </div>
  )
}