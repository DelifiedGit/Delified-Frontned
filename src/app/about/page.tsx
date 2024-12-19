'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Zap, Users, Rocket, ChevronDown, ChevronUp } from 'lucide-react'

export default function AboutPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-purple-50 to-indigo-100">
      <motion.h1 
        className="text-5xl md:text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to Delified
      </motion.h1>
      
      <motion.p 
        className="text-xl md:text-2xl text-center mb-12 text-gray-700"
        {...fadeInUp}
      >
        A vibrant community & revolutionary platform crafted for the doers, dreamers, and changemakers of tomorrow.
      </motion.p>

      <motion.section className="mb-16" {...fadeInUp}>
        <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <h2 className="text-3xl font-bold mb-4 text-indigo-600">Our Vibe</h2>
            <p className="text-lg mb-4">
              We're all about:
            </p>
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <Sparkles className="mr-2 text-purple-500" />
                <span>Hosting transformative and impactful events</span>
              </li>
              <li className="flex items-center">
                <Zap className="mr-2 text-yellow-500" />
                <span>Curating world-class debates</span>
              </li>
              <li className="flex items-center">
                <Rocket className="mr-2 text-blue-500" />
                <span>Offering premium internship opportunities to kickstart your career</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section className="mb-16" {...fadeInUp}>
        <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <h2 className="text-3xl font-bold mb-4 text-indigo-600">Our Mission</h2>
            <p className="text-lg mb-4">
              Delified is driven by the passion for empowering the leaders of tomorrow. We believe in:
            </p>
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <Sparkles className="mr-2 text-purple-500" />
                <span>Igniting passions</span>
              </li>
              <li className="flex items-center">
                <Users className="mr-2 text-green-500" />
                <span>Fostering leadership</span>
              </li>
              <li className="flex items-center">
                <Zap className="mr-2 text-yellow-500" />
                <span>Inspiring innovation</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section className="mb-16" {...fadeInUp}>
        <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="cursor-pointer" onClick={() => toggleSection('journey')}>
            <CardTitle className="text-2xl font-bold flex items-center justify-between">
              Our Journey
              {expandedSection === 'journey' ? <ChevronUp /> : <ChevronDown />}
            </CardTitle>
          </CardHeader>
          {expandedSection === 'journey' && (
            <CardContent className="p-6">
              <p className="text-lg mb-4">
                Delified MUNs was born in 2020 from a passion for Model United Nations and a vision to make these 
                transformative experiences accessible to students across India. What started as a small team of MUN 
                enthusiasts has grown into India's leading platform for MUN conferences, competitions, and resources.
              </p>
              <Image 
                src="/placeholder.jpeg" 
                alt="Delified MUNs Journey" 
                width={800} 
                height={400} 
                className="rounded-lg mx-auto"
              />
            </CardContent>
          )}
        </Card>
      </motion.section>

      <motion.section className="mb-16" {...fadeInUp}>
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">What We Do</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Connect", icon: Users, 
              content: "At Delified, we bridge worlds and minds, creating networks and forge meaningful connections. This is where connections become catalysts for change." },
            { title: "Educate", icon: Zap, 
              content: "Empowering minds through immersive experiences. We craft events that foster learning, spark curiosity, and unlock new horizons of understanding." },
            { title: "Grow", icon: Rocket, 
              content: "Fueling ambitions with opportunities that drive progress. We create spaces where ideas thrive and dreams take shape." }
          ].map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }}>
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <item.icon className="mr-2 text-indigo-500" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>{item.content}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mb-16 text-center" {...fadeInUp}>
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
      <Button asChild className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
          <Link href="/signup">Join Delified Today</Link>
        </Button>
      </h2>
        <p className="text-xl mb-8">
          Be part of our thriving ecosystem where innovation meets ambition, collaboration sparks change, and every interaction leaves a lasting impact.
        </p>
      </motion.section>

      <motion.section className="text-center" {...fadeInUp}>
        <h2 className="text-3xl font-bold mb-6 text-indigo-600">Our Impact</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { number: "100+", label: "MUN Conferences" },
            { number: "50,000+", label: "Students Reached" },
            { number: "20+", label: "Cities Across India" },
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="p-6 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <p className="text-4xl font-bold text-indigo-600 mb-2">{stat.number}</p>
              <p className="text-xl text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

