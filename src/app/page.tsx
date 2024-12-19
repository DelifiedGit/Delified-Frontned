'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Users, Briefcase } from 'lucide-react'

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 text-gray-800">
      <main>
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              Ignite Your Future
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
            >
              Join Delified, where innovation meets ambition. Discover transformative events, engage in world-class debates, and kickstart your career with premium internships.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center mx-auto">
                Explore Opportunities <ArrowRight className="ml-2" />
              </button>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 bg-white bg-opacity-50">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">What We Offer</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { icon: Calendar, title: "Transformative Events", description: "Attend life-changing events that inspire and educate." },
                { icon: Users, title: "World-Class Debates", description: "Engage in thought-provoking discussions with global leaders." },
                { icon: Briefcase, title: "Premium Internships", description: "Kickstart your career with exclusive internship opportunities." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  style={{
                    boxShadow: '12px 12px 24px #d1d1d1, -12px -12px 24px #ffffff'
                  }}
                >
                  <item.icon className="w-12 h-12 mb-6 text-indigo-600" />
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="container mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: scrollY > 600 ? 1 : 0, y: scrollY > 600 ? 0 : 20 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold mb-6"
            >
              Join Our Community
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: scrollY > 600 ? 1 : 0, y: scrollY > 600 ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl mb-12 max-w-2xl mx-auto"
            >
              Be part of a thriving ecosystem where innovation meets ambition, collaboration sparks change, and every interaction leaves a lasting impact.
            </motion.p>
          
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: scrollY > 600 ? 1 : 0, y: scrollY > 600 ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
                           
            >
              Get Started Now
            </motion.button>
            
          </div>
        </section>
      </main>
    </div>
  )
}

