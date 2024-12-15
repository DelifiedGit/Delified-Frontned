import { Suspense } from 'react'
import Dashboard from './dashPage'


export default function MUNsPage() {
  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <Dashboard />
      </Suspense>
    </div>
  )
}