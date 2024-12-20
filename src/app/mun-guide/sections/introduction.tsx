import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from 'lucide-react'

export function IntroductionSection() {
  return (
    <motion.section
      id="introduction"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-700">
        <Users className="h-8 w-8" />
        Introduction to Model United Nations
      </h2>
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardContent className="prose max-w-none p-6">
          <p>
            Model United Nations (MUN) is an educational simulation where students learn about diplomacy,
            international relations, and the United Nations. Participants role-play as delegates representing
            different countries and work to solve global issues through negotiation and collaboration.
          </p>
          <h3 className="text-2xl font-semibold mt-6 mb-4 text-blue-600">Why Participate in MUN?</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Develop public speaking and leadership skills</li>
            <li>Learn about international relations and global issues</li>
            <li>Improve research and analytical abilities</li>
            <li>Build networking and negotiation skills</li>
            <li>Enhance your college applications and resume</li>
          </ul>
        </CardContent>
      </Card>
    </motion.section>
  )
}

