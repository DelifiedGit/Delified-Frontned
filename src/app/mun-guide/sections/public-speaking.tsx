import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle } from 'lucide-react'

export function PublicSpeakingSection() {
  return (
    <motion.section
      id="speaking"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-700">
        <MessageCircle className="h-8 w-8" />
        Public Speaking Skills
      </h2>
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardContent className="prose max-w-none p-6">
          <p>
            Effective public speaking is crucial for success in MUN. Master these key aspects:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Speech Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Strong opening statement</li>
                  <li>Clear main points</li>
                  <li>Supporting evidence</li>
                  <li>Compelling conclusion</li>
                  <li>Call to action</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Delivery Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintain eye contact</li>
                  <li>Use appropriate gestures</li>
                  <li>Control your pace</li>
                  <li>Project confidence</li>
                  <li>Practice active listening</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

