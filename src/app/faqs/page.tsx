'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search } from 'lucide-react'

const faqs = [
  {
    id: 'registration',
    question: "How do I register for a MUN conference?",
    answer: "To register for a MUN conference, navigate to our 'MUNs' page, select the conference you're interested in, and click on the 'Register' button. Follow the prompts to complete your registration and payment."
  },
  {
    id: 'preparation',
    question: "How should I prepare for a MUN conference?",
    answer: "Preparation is key to success in MUN. Research your assigned country and committee topics thoroughly. Practice public speaking and familiarize yourself with MUN rules of procedure. Our MUN Guide provides comprehensive preparation tips."
  },
  {
    id: 'technical',
    question: "What are the technical requirements for online MUNs?",
    answer: "For online MUNs, you'll need a stable internet connection, a computer or tablet with a webcam and microphone, and a quiet environment. We recommend using the latest version of Chrome or Firefox browsers for the best experience."
  },
  {
    id: 'payment',
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards (Visa, MasterCard, American Express) and PayPal for conference registrations. Some conferences may also offer additional payment options, which will be specified on the registration page."
  },
  {
    id: 'refund',
    question: "What is your refund policy?",
    answer: "Our refund policy varies depending on the conference. Generally, full refunds are available up to 30 days before the conference start date. Partial refunds may be available after that. Please check the specific conference details for exact refund terms."
  },
  {
    id: 'certificate',
    question: "Do I receive a certificate for participating?",
    answer: "Yes, all participants receive a digital certificate of participation upon successful completion of the MUN conference. Delegates who win awards will receive special recognition on their certificates."
  },
]

export default function FAQsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Find answers to common questions about Delified and our conferences.
      </p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search FAQs</CardTitle>
          <CardDescription>Type your question or keywords to find relevant answers.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        {filteredFaqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {filteredFaqs.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">
          No FAQs match your search. Please try different keywords or contact us for further assistance.
        </p>
      )}

      <div className="mt-12 text-center">
        <p className="mb-4">Can't find the answer you're looking for?</p>
        <Button asChild>
          <a href="/contact">Contact Us</a>
        </Button>
      </div>
    </div>
  )
}