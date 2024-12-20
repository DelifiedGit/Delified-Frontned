import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb } from 'lucide-react'

export function NegotiationSection() {
  return (
    <motion.section
      id="negotiation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-700">
        <Lightbulb className="h-8 w-8" />
        Negotiation Strategies
      </h2>
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardContent className="prose max-w-none p-6">
          <p>
            Successful negotiation is the key to building consensus and passing resolutions. Learn these
            essential strategies:
          </p>
          <div className="bg-blue-50 p-6 rounded-lg mt-6">
            <h3 className="text-2xl font-semibold mb-4 text-blue-700">Key Negotiation Techniques</h3>
            <ul className="space-y-4">
              <li>
                <strong>Build Alliances:</strong> Identify potential allies and work together on common goals
              </li>
              <li>
                <strong>Find Common Ground:</strong> Look for shared interests and compromise opportunities
              </li>
              <li>
                <strong>Active Listening:</strong> Understand other delegates' positions and concerns
              </li>
              <li>
                <strong>Effective Communication:</strong> Clearly articulate your position and proposals
              </li>
              <li>
                <strong>Problem Solving:</strong> Focus on finding solutions that benefit multiple parties
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

