import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target } from 'lucide-react'

export function ResearchSection() {
  return (
    <motion.section
      id="research"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-700">
        <Target className="h-8 w-8" />
        Research Techniques
      </h2>
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardContent className="prose max-w-none p-6">
          <p>
            Effective research is the foundation of successful MUN participation. Here are proven research
            strategies and resources:
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Primary Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>UN official documents</li>
                  <li>Government websites</li>
                  <li>International treaties</li>
                  <li>Official statements</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Secondary Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Academic journals</li>
                  <li>Think tank reports</li>
                  <li>News articles</li>
                  <li>NGO publications</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Research Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>UN Digital Library</li>
                  <li>Google Scholar</li>
                  <li>Academic databases</li>
                  <li>Fact-checking websites</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

