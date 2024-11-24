import { Suspense } from 'react'
import Link from 'next/link'
import MUNsList from './muns-list'
import { Button } from '@/components/ui/button'

export default function MUNsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Upcoming MUNs</h1>
        <Link href="/list-mun" passHref>
          <Button>List Your MUN</Button>
        </Link>
      </div>
      <Suspense fallback={<div>Loading MUNs...</div>}>
        <MUNsList />
      </Suspense>
    </div>
  )
}