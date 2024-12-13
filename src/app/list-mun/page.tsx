'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createMUN } from '@/lib/api'

type FieldType = 'text' | 'number' | 'dropdown' | 'checkbox' | 'radio'

interface CustomField {
  id: string
  type: FieldType
  label: string
  options?: string[]
}

export default function ListMUNPage() {
  const [eventName, setEventName] = useState('')
  const [date, setDate] = useState('')
  const [venue, setVenue] = useState('')
  const [description, setDescription] = useState('')
  const [registrationFees, setRegistrationFees] = useState('')
  const [customFields, setCustomFields] = useState<CustomField[]>([])
  const [newFieldType, setNewFieldType] = useState<FieldType>('text')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
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

  const formatCustomFieldsForAPI = (fields: CustomField[]) => {
    return fields.reduce((acc, field) => {
      acc[field.label] = {
        type: field.type,
        options: field.options
      }
      return acc
    }, {} as Record<string, any>)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)
    
    try {
      const munData = {
        event_name: eventName,
        date,
        venue,
        description,
        registration_fees: Number(registrationFees),
        custom_fields: formatCustomFieldsForAPI(customFields)
      }
      
      await createMUN(munData)
      setSuccess('MUN created successfully')
      setTimeout(() => {
        router.push('/muns')
      }, 2000)
    } catch (error) {
      console.error('Error creating MUN:', error)
      setError(error instanceof Error ? error.message : 'Failed to create MUN')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">List Your MUN</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {success}</span>
        </div>
      )}
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
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="registrationFees">Registration Fees</Label>
          <Input
            id="registrationFees"
            type="number"
            step="0.01"
            min="0"
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

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Submit MUN Listing'}
        </Button>
      </form>
    </div>
  )
}

