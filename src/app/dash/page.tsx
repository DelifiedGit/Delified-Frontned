import { Suspense } from 'react'
import Dashboard from './dashBoardPage'
import { Loader2 } from 'lucide-react'

export default function DashPage() {
  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      }>
        <Dashboard />
      </Suspense>
    </div>
  )
}

