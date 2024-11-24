import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
          Welcome to Delified
        </h1>
        <p className="text-xl mb-8 text-muted-foreground">
          Empowering future leaders through Model United Nations conferences
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/muns">Explore MUNs</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/mun-guide">MUN Guide</Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Conferences</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Discover and register for our upcoming Model UN conferences.</p>
            <Button className="mt-4" asChild>
              <Link href="/muns">View Conferences</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>MUN Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Access guides, tips, and resources to excel in your MUN journey.</p>
            <Button className="mt-4" asChild>
              <Link href="/mun-guide">Access Resources</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Community</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Connect with fellow MUN enthusiasts and share experiences.</p>
            <Button className="mt-4" asChild>
              <Link href="/community">Join Community</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to start your MUN journey?</h2>
        <Button size="lg" asChild>
          <Link href="/signup">Sign Up Now</Link>
        </Button>
      </section>
    </div>
  )
}