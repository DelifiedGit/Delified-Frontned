import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PenTool } from 'lucide-react'

export function RulesSection() {
  return (
    <motion.section
      id="rules"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-700">
        <PenTool className="h-8 w-8" />
        Rules of Procedure
      </h2>
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardContent className="prose max-w-none p-6">
          <p>
            Understanding and effectively using the rules of procedure is essential for successful participation:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Common Motions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Motion to Open Debate</li>
                  <li>Motion for Moderated Caucus</li>
                  <li>Motion for Unmoderated Caucus</li>
                  <li>Motion to Introduce Working Paper</li>
                  <li>Motion to Move into Voting Procedure</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Points</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Point of Order</li>
                  <li>Point of Parliamentary Inquiry</li>
                  <li>Point of Personal Privilege</li>
                  <li>Point of Information</li>
                  <li>Right of Reply</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

