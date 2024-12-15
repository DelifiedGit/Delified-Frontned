import { Suspense } from 'react'
import Link from 'next/link'
import MUNsList from './dashPage'
import { Button } from '@/components/ui/button'

export default function MUNsPage() {
  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<div>Loading MUNs...</div>}>
        <MUNsList />
      </Suspense>
    </div>
  )
}