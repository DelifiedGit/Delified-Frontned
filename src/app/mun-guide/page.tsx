'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Award, BookOpen, Users, MessageCircle, Target, Lightbulb, FileText, PenTool, ChevronDown } from 'lucide-react'
import { TableOfContents } from './table-of-contents'
import { IntroductionSection } from './sections/introduction'
import { PreparationSection } from './sections/preparation'
import { ResearchSection } from './sections/research'
import { PositionPaperSection } from './sections/position-paper'
import { PublicSpeakingSection } from './sections/public-speaking'
import { NegotiationSection } from './sections/negotiation'
import { RulesSection } from './sections/rules'
import { AwardsSection } from './sections/awards'

const sectionIcons = {
  introduction: Users,
  preparation: BookOpen,
  research: Target,
  'position-paper': FileText,
  speaking: MessageCircle,
  negotiation: Lightbulb,
  rules: PenTool,
  awards: Award,
}

export default function MUNGuidePage() {
  const [activeSection, setActiveSection] = useState('introduction')

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            MUN Guide 2024
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Master the art of diplomacy and enhance your MUN performance
          </p>
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8 shadow-xl">
            <Image
              src="/placeholder.jpeg"
              alt="Model United Nations Conference"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-3xl font-bold mb-2">The Ultimate Guide to Winning MUN Conferences</h2>
              <p className="text-lg">Comprehensive strategies and tips for success</p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <Card className="md:col-span-1 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <TableOfContents activeSection={activeSection} setActiveSection={setActiveSection} />
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-12">
            <IntroductionSection />
            <PreparationSection />
            <ResearchSection />
            <PositionPaperSection />
            <PublicSpeakingSection />
            <NegotiationSection />
            <RulesSection />
            <AwardsSection />
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your MUN Journey?</h2>
            <p className="text-xl mb-6">
              Explore upcoming MUN conferences and put your knowledge into practice
            </p>
            <Link href="/muns">
              <Button size="lg" variant="secondary" className="text-blue-600 hover:text-blue-700 transition-colors">
                Browse MUN Conferences
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

