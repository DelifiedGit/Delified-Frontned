'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CalendarDays, Users, MessageCircle } from 'lucide-react'

export default function CommunityPage() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement subscription logic
    console.log('Subscribed:', email)
    setEmail('')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Delified Community</h1>
        <p className="text-xl text-muted-foreground">Where dreamers, doers, and innovators come together</p>
      </header>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Our Community Spirit</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Embrace creativity and push boundaries to create extraordinary events.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Inclusivity</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Every voice matters. We celebrate diversity and welcome all perspectives.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Strive for the best in everything we do, setting new standards in event management.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Upcoming Community Events</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Delified Innovators Meetup</CardTitle>
              <CardDescription>
                <CalendarDays className="inline-block mr-2" />
                June 15, 2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Join us for an evening of networking and idea-sharing with fellow event enthusiasts.</p>
            </CardContent>
            <CardFooter>
              <Button>Learn More</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Event Management Workshop</CardTitle>
              <CardDescription>
                <CalendarDays className="inline-block mr-2" />
                July 2, 2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Enhance your skills with our comprehensive workshop on modern event management techniques.</p>
            </CardContent>
            <CardFooter>
              <Button>Register Now</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Community Highlights</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Members</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Users className="inline-block mb-2" size={48} />
              <p className="text-4xl font-bold">5,000+</p>
              <p className="text-muted-foreground">and growing every day</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Events Organized</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CalendarDays className="inline-block mb-2" size={48} />
              <p className="text-4xl font-bold">1,000+</p>
              <p className="text-muted-foreground">successful events and counting</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Community Discussions</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <MessageCircle className="inline-block mb-2" size={48} />
              <p className="text-4xl font-bold">10,000+</p>
              <p className="text-muted-foreground">engaging conversations</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Community Testimonials</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/avatars/01.png" alt="Aarav Patel" />
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Aarav Patel</CardTitle>
                  <CardDescription>Event Organizer</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>"Delified has transformed the way I approach event planning. The community support is incredible!"</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/avatars/02.png" alt="Priya Sharma" />
                  <AvatarFallback>PS</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Priya Sharma</CardTitle>
                  <CardDescription>Marketing Specialist</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>"The innovative ideas and collaborative spirit in the Delified community are unmatched. It's been a game-changer for my events."</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Join Our Community</CardTitle>
            <CardDescription>Stay updated with the latest events, tips, and community highlights</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubscribe} className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Get Involved</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Share Your Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Have a success story or valuable insights to share with the community? We'd love to hear from you!</p>
            </CardContent>
            <CardFooter>
              <Button>Submit Your Story</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Looking to make a difference? Explore our volunteer programs and contribute to the community's growth.</p>
            </CardContent>
            <CardFooter>
              <Button>Explore Opportunities</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}