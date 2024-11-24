import { Suspense } from 'react'
import MUNDetailContent from './mun-detail-content'

export default async function MUNDetailPage({ params }: { params: { id: string } }) {
    
  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<div className="text-center">Loading MUN details...</div>}>
        <MUNDetailContent id={params.id} />
      </Suspense>
    </div>
  )
}