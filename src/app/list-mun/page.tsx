'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createMUN } from '@/lib/api'
import { ArrowRight, Calendar, MapPin, FileText, DollarSign, Plus, Minus, Trash2, ChevronRight, ChevronLeft } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import confetti from 'canvas-confetti'

type FieldType = 'text' | 'number' | 'dropdown' | 'checkbox' | 'radio'

interface CustomField {
  id: string
  type: FieldType
  label: string
  options?: string[]
}

const steps = ['Event Details', 'Custom Fields', 'Preview']

export default function InteractiveListMUNPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [eventName, setEventName] = useState('')
  const [date, setDate] = useState('')
  const [venue, setVenue] = useState('')
  const [description, setDescription] = useState('')
  const [registrationFees, setRegistrationFees] = useState('')
  const [customFields, setCustomFields] = useState<CustomField[]>([])
  const [newFieldType, setNewFieldType] = useState<FieldType>('text')
  const [isSubmitting, setIsSubmitting] = useState(false)
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
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      toast.success('MUN created successfully! Redirecting...')
      setTimeout(() => {
        router.push('/muns')
      }, 3000)
    } catch (error) {
      console.error('Error creating MUN:', error)
      toast.error('Failed to create MUN. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 p-4 md:p-8 flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <h1 className="text-4xl font-bold text-white mb-6">Create Your MUN Event</h1>
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep ? 'bg-green-500' : 'bg-gray-300'
                  } text-white font-bold`}
                >
                  {index + 1}
                </div>
                <span className="ml-2 text-white">{step}</span>
                {index < steps.length - 1 && (
                  <div className="w-16 h-1 mx-2 bg-gray-300">
                    <div
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{ width: `${index < currentStep ? '100%' : '0%'}` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="eventName" className="text-lg font-semibold text-gray-200">Event Name</Label>
                    <div className="relative">
                      <Input
                        id="eventName"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                        className="pl-10 bg-white bg-opacity-20 backdrop-blur-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-white placeholder:text-gray-300"
                        placeholder="Enter your event name"
                      />
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-lg font-semibold text-gray-200">Date</Label>
                    <div className="relative">
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="pl-10 bg-white bg-opacity-20 backdrop-blur-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-white placeholder:text-gray-300"
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue" className="text-lg font-semibold text-gray-200">Venue</Label>
                    <div className="relative">
                      <Input
                        id="venue"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        required
                        className="pl-10 bg-white bg-opacity-20 backdrop-blur-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-white placeholder:text-gray-300"
                        placeholder="Enter the venue"
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-lg font-semibold text-gray-200">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      className="bg-white bg-opacity-20 backdrop-blur-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-white placeholder:text-gray-300"
                      placeholder="Describe your MUN event"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registrationFees" className="text-lg font-semibold text-gray-200">Registration Fees</Label>
                    <div className="relative">
                      <Input
                        id="registrationFees"
                        type="number"
                        step="0.01"
                        min="0"
                        value={registrationFees}
                        onChange={(e) => setRegistrationFees(e.target.value)}
                        required
                        className="pl-10 bg-white bg-opacity-20 backdrop-blur-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-white placeholder:text-gray-300"
                        placeholder="Enter registration fees"
                      />
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-semibold text-white mb-4">Custom Fields</h2>
                  {customFields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                      className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 space-y-2"
                    >
                      <Input
                        value={field.label}
                        onChange={(e) => updateCustomField(field.id, { label: e.target.value })}
                        placeholder="Field Label"
                        className="bg-white bg-opacity-20 backdrop-blur-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-white placeholder:text-gray-300"
                      />
                      {(field.type === 'dropdown' || field.type === 'checkbox' || field.type === 'radio') && (
                        <div>
                          <Label className="text-gray-200">Options</Label>
                          {field.options?.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2 mt-1">
                              <Input
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...(field.options || [])]
                                  newOptions[optionIndex] = e.target.value
                                  updateCustomField(field.id, { options: newOptions })
                                }}
                                className="bg-white bg-opacity-20 backdrop-blur-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-white placeholder:text-gray-300"
                              />
                              <Button
                                type="button"
                                onClick={() => {
                                  const newOptions = field.options?.filter((_, i) => i !== optionIndex)
                                  updateCustomField(field.id, { options: newOptions })
                                }}
                                variant="ghost"
                                size="icon"
                                className="text-gray-200 hover:text-white hover:bg-red-500"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            onClick={() => updateCustomField(field.id, { options: [...(field.options || []), ''] })}
                            variant="outline"
                            size="sm"
                            className="mt-2 text-white border-gray-300 hover:bg-indigo-600"
                          >
                            <Plus className="h-4 w-4 mr-2" /> Add Option
                          </Button>
                        </div>
                      )}
                      <Button
                        type="button"
                        onClick={() => removeCustomField(field.id)}
                        variant="destructive"
                        size="sm"
                        className="mt-2"
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Remove Field
                      </Button>
                    </motion.div>
                  ))}
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold text-gray-200">Add Custom Field</Label>
                    <Select onValueChange={(value: FieldType) => setNewFieldType(value)}>
                      <SelectTrigger className="bg-white bg-opacity-20 backdrop-blur-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-white">
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
                    <Button
                      type="button"
                      onClick={addCustomField}
                      className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Field
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-semibold text-white mb-4">Preview</h2>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 space-y-4">
                    <h3 className="text-xl font-bold text-white">{eventName}</h3>
                    <p className="text-gray-200"><Calendar className="inline-block mr-2" /> {date}</p>
                    <p className="text-gray-200"><MapPin className="inline-block mr-2" /> {venue}</p>
                    <p className="text-gray-200">{description}</p>
                    <p className="text-gray-200"><DollarSign className="inline-block mr-2" /> Registration Fee: {registrationFees}</p>
                    {customFields.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-white mt-4 mb-2">Custom Fields</h4>
                        <ul className="list-disc list-inside text-gray-200">
                          {customFields.map((field) => (
                            <li key={field.id}>{field.label} ({field.type})</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <Button type="button" onClick={prevStep} className="bg-gray-600 hover:bg-gray-700 text-white">
                  <ChevronLeft className="mr-2 h-5 w-5" /> Previous
                </Button>
              )}
              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 text-white ml-auto">
                  Next <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg ml-auto"
                >
                  {isSubmitting ? 'Creating...' : 'Submit MUN Listing'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

