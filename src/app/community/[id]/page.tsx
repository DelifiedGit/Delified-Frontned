'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Users, MessageCircle, Calendar } from 'lucide-react'

// Mock data for the community
const communityData = {
  id: '1',
  name: 'Event Planners United',
  description: 'A community for professional event planners to share ideas, tips, and experiences.',
  members: 1200,
  posts: 450,
  events: [
    { id: 1, name: 'Virtual Networking Mixer', date: '2024-07-15' },
    { id: 2, name: 'Event Tech Workshop', date: '2024-08-02' },
  ],
}

const posts = [
  { id: 1, author: 'Jane Doe', content: 'Just finished planning an amazing corporate event! Can\'t wait to share the details with everyone.', likes: 24, comments: 5 },
  { id: 2, author: 'John Smith', content: 'Looking for recommendations on the best event management software. Any suggestions?', likes: 15, comments: 8 },
  { id: 3, author: 'Emily Brown', content: 'Excited to announce our upcoming webinar on sustainable event planning. Save the date!', likes: 32, comments: 12 },
]

const members = [
  { id: 1, name: 'Jane Doe', role: 'Event Planner' },
  { id: 2, name: 'John Smith', role: 'Venue Coordinator' },
  { id: 3, name: 'Emily Brown', role: 'Marketing Specialist' },
  { id: 4, name: 'Michael Johnson', role: 'Tech Support' },
  { id: 5, name: 'Sarah Williams', role: 'Catering Manager' },
]

export default function CommunityView() {
  const params = useParams()
  const communityId = params.id
  const [newPost, setNewPost] = useState('')

  const handlePostSubmit = () => {
    // TODO: Implement post submission logic
    console.log('New post in community:', communityId, newPost)
    setNewPost('')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">{communityData.name}</CardTitle>
          <CardDescription>{communityData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>{communityData.members} members</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="mr-2 h-4 w-4" />
                <span>{communityData.posts} posts</span>
              </div>
            </div>
            <Button>Invite Members</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Community Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Share your thoughts with the community..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="mb-2"
              />
              <Button onClick={handlePostSubmit}>Post</Button>
              <Separator className="my-4" />
              <ScrollArea className="h-[600px]">
                {posts.map((post) => (
                  <Card key={post.id} className="mb-4">
                    <CardHeader>
                      <div className="flex items-center">
                        <Avatar className="mr-2">
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                          <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-sm">{post.author}</CardTitle>
                          <CardDescription>2 hours ago</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{post.content}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="mr-2">Like ({post.likes})</Button>
                      <Button variant="outline">Comment ({post.comments})</Button>
                    </CardFooter>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                {communityData.events.map((event) => (
                  <div key={event.id} className="flex items-center mb-4">
                    <Calendar className="mr-2 h-4 w-4" />
                    <div>
                      <p className="font-medium">{event.name}</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View All Events</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Members</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center mb-4">
                    <Avatar className="mr-2">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View All Members</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}