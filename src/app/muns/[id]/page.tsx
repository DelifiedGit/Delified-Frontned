'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import MUNDetailContent from './mun-detail-content'

export default function MUNDetailPage({ params }: { params: { id: string } }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-8"
    >
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-600"></div>
        </div>
      }>
        <MUNDetailContent id={params.id} />
      </Suspense>
    </motion.div>
  )
}

