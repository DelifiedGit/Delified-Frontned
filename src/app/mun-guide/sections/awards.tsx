import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award } from 'lucide-react'

export function AwardsSection() {
  return (
    <motion.section
      id="awards"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-700">
        <Award className="h-8 w-8" />
        Winning Awards
      </h2>
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardContent className="prose max-w-none p-6">
          <p>
            While the primary goal of MUN is learning and growth, here's how to increase your chances of
            winning awards:
          </p>
          <div className="bg-blue-50 p-6 rounded-lg mt-6">
            <h3 className="text-2xl font-semibold mb-4 text-blue-700">Award Winning Strategies</h3>
            <ul className="space-y-4">
              <li>
                <strong>Thorough Preparation:</strong> Research extensively and prepare comprehensive notes
              </li>
              <li>
                <strong>Active Participation:</strong> Contribute meaningfully to all aspects of debate
              </li>
              <li>
                <strong>Leadership:</strong> Take initiative in working papers and bloc formation
              </li>
              <li>
                <strong>Diplomacy:</strong> Maintain professional conduct and build positive relationships
              </li>
              <li>
                <strong>Solution-Oriented:</strong> Focus on constructive solutions and consensus building
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

