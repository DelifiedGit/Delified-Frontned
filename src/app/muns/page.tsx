'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import MUNsList from './muns-list'
import { Button } from '@/components/ui/button'
import { Globe, Sparkles, ChevronDown } from 'lucide-react'

export default function MUNsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 to-purple-700 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold text-white mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          >
            Discover MUNs
          </motion.h1>
          <motion.p 
            className="text-xl text-purple-200 mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          >
            Engage in global discussions, shape the future
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link href="/list-mun" passHref>
              <Button className="bg-white text-purple-700 hover:bg-purple-100 font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg">
                <Globe className="mr-2 h-5 w-5" />
                List Your MUN
              </Button>
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Suspense fallback={
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white"></div>
            </div>
          }>
            <MUNsList />
          </Suspense>
        </motion.div>
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Button
            variant="ghost"
            className="text-white hover:text-purple-200 transition-colors duration-300"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          >
            Explore More
            <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

