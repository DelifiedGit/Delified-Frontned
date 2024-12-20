import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen } from 'lucide-react'

export function PreparationSection() {
  return (
    <motion.section
      id="preparation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-700">
        <BookOpen className="h-8 w-8" />
        Pre-Conference Preparation
      </h2>
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardContent className="prose max-w-none p-6">
          <p>
            Success in MUN begins long before the conference. Here's your comprehensive preparation checklist:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Research Your Country</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Political system and government structure</li>
                  <li>Economic situation and trade relationships</li>
                  <li>Historical context and cultural background</li>
                  <li>Current foreign policy positions</li>
                  <li>Alliances and international agreements</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Understand Your Committee</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Committee mandate and powers</li>
                  <li>Previous resolutions and actions</li>
                  <li>Current challenges and priorities</li>
                  <li>Key member states and their positions</li>
                  <li>Rules of procedure</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

