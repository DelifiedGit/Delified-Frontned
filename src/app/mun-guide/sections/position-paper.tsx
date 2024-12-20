import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText } from 'lucide-react'

export function PositionPaperSection() {
  return (
    <motion.section
      id="position-paper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-700">
        <FileText className="h-8 w-8" />
        Writing Position Papers
      </h2>
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardContent className="prose max-w-none p-6">
          <p>
            A position paper presents your country's stance on the committee topics. Here's how to write
            an award-winning position paper:
          </p>
          <div className="bg-blue-50 p-6 rounded-lg mt-6">
            <h3 className="text-2xl font-semibold mb-4 text-blue-700">Position Paper Structure</h3>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong>Introduction</strong>
                <p>Brief overview of your country's relationship with the topic</p>
              </li>
              <li>
                <strong>Past International Actions</strong>
                <p>Review of previous UN resolutions and international efforts</p>
              </li>
              <li>
                <strong>Country's Position</strong>
                <p>Detailed explanation of your country's stance and past actions</p>
              </li>
              <li>
                <strong>Proposed Solutions</strong>
                <p>Specific, actionable proposals to address the issue</p>
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

