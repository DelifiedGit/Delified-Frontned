import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award, BookOpen, Users, MessageCircle, Target, Lightbulb, FileText, PenTool } from 'lucide-react'

export default function MUNGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          MUN Guide 2024: The Ultimate Guide to Winning Model United Nations Conferences
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Master the art of diplomacy and enhance your MUN performance with our comprehensive guide
        </p>
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
          <Image
            src="/placeholder.jpeg"
            alt="Model United Nations Conference"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Table of Contents */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Table of Contents</CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="grid gap-2">
            <Link href="#introduction" className="text-blue-600 hover:underline">1. Introduction to Model United Nations</Link>
            <Link href="#preparation" className="text-blue-600 hover:underline">2. Pre-Conference Preparation</Link>
            <Link href="#research" className="text-blue-600 hover:underline">3. Research Techniques</Link>
            <Link href="#position-paper" className="text-blue-600 hover:underline">4. Writing Position Papers</Link>
            <Link href="#speaking" className="text-blue-600 hover:underline">5. Public Speaking Skills</Link>
            <Link href="#negotiation" className="text-blue-600 hover:underline">6. Negotiation Strategies</Link>
            <Link href="#rules" className="text-blue-600 hover:underline">7. Rules of Procedure</Link>
            <Link href="#awards" className="text-blue-600 hover:underline">8. Winning Awards</Link>
          </nav>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Introduction Section */}
        <section id="introduction">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Users className="h-8 w-8" />
            Introduction to Model United Nations
          </h2>
          <div className="prose max-w-none">
            <p>
              Model United Nations (MUN) is an educational simulation where students learn about diplomacy,
              international relations, and the United Nations. Participants role-play as delegates representing
              different countries and work to solve global issues through negotiation and collaboration.
            </p>
            <h3 className="text-2xl font-semibold mt-6 mb-4">Why Participate in MUN?</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Develop public speaking and leadership skills</li>
              <li>Learn about international relations and global issues</li>
              <li>Improve research and analytical abilities</li>
              <li>Build networking and negotiation skills</li>
              <li>Enhance your college applications and resume</li>
            </ul>
          </div>
        </section>

        {/* Preparation Section */}
        <section id="preparation">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="h-8 w-8" />
            Pre-Conference Preparation
          </h2>
          <div className="prose max-w-none">
            <p>
              Success in MUN begins long before the conference. Here's your comprehensive preparation checklist:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Research Your Country</CardTitle>
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
                  <CardTitle>Understand Your Committee</CardTitle>
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
          </div>
        </section>

        {/* Research Section */}
        <section id="research">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Target className="h-8 w-8" />
            Research Techniques
          </h2>
          <div className="prose max-w-none">
            <p>
              Effective research is the foundation of successful MUN participation. Here are proven research
              strategies and resources:
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Primary Sources</CardTitle>
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
                  <CardTitle>Secondary Sources</CardTitle>
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
                  <CardTitle>Research Tools</CardTitle>
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
          </div>
        </section>

        {/* Position Paper Section */}
        <section id="position-paper">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Writing Position Papers
          </h2>
          <div className="prose max-w-none">
            <p>
              A position paper presents your country's stance on the committee topics. Here's how to write
              an award-winning position paper:
            </p>
            <div className="bg-muted p-6 rounded-lg mt-6">
              <h3 className="text-2xl font-semibold mb-4">Position Paper Structure</h3>
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
          </div>
        </section>

        {/* Public Speaking Section */}
        <section id="speaking">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="h-8 w-8" />
            Public Speaking Skills
          </h2>
          <div className="prose max-w-none">
            <p>
              Effective public speaking is crucial for success in MUN. Master these key aspects:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Speech Structure</CardTitle>
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
                  <CardTitle>Delivery Tips</CardTitle>
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
          </div>
        </section>

        {/* Negotiation Section */}
        <section id="negotiation">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Lightbulb className="h-8 w-8" />
            Negotiation Strategies
          </h2>
          <div className="prose max-w-none">
            <p>
              Successful negotiation is the key to building consensus and passing resolutions. Learn these
              essential strategies:
            </p>
            <div className="bg-muted p-6 rounded-lg mt-6">
              <h3 className="text-2xl font-semibold mb-4">Key Negotiation Techniques</h3>
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
          </div>
        </section>

        {/* Rules Section */}
        <section id="rules">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <PenTool className="h-8 w-8" />
            Rules of Procedure
          </h2>
          <div className="prose max-w-none">
            <p>
              Understanding and effectively using the rules of procedure is essential for successful participation:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Common Motions</CardTitle>
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
                  <CardTitle>Points</CardTitle>
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
          </div>
        </section>

        {/* Awards Section */}
        <section id="awards">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Award className="h-8 w-8" />
            Winning Awards
          </h2>
          <div className="prose max-w-none">
            <p>
              While the primary goal of MUN is learning and growth, here's how to increase your chances of
              winning awards:
            </p>
            <div className="bg-muted p-6 rounded-lg mt-6">
              <h3 className="text-2xl font-semibold mb-4">Award Winning Strategies</h3>
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
          </div>
        </section>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Your MUN Journey?</h2>
        <p className="text-muted-foreground mb-6">
          Explore upcoming MUN conferences and put your knowledge into practice
        </p>
        <Link href="/muns">
          <Button size="lg">
            Browse MUN Conferences
          </Button>
        </Link>
      </div>
    </div>
  )
}