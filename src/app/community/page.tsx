'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { CalendarDays, Users, MessageCircle, Plus, Search } from 'lucide-react'
import { fetchCommunities, createCommunity, joinCommunity, fetchGeneralFeed, createPost, login } from '@/lib/api'
import { useRouter } from 'next/navigation'

interface Community {
  id: string;
  name: string;
  members: number;
  posts: number;
}

interface Post {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

export default function CommunityPage() {
  const [email, setEmail] = useState('')
  const [newCommunityName, setNewCommunityName] = useState('')
  const [newCommunityDescription, setNewCommunityDescription] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [newPost, setNewPost] = useState('')
  const [communities, setCommunities] = useState<Community[]>([])
  const [myCommunities, setMyCommunities] = useState<Community[]>([])
  const [generalFeed, setGeneralFeed] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token')
      setIsAuthenticated(!!token)
    }

    checkAuth()
  }, [])

  useEffect(() => {
    setIsLoading(true)
    Promise.all([
      fetchCommunities(),
      isAuthenticated ? fetchCommunities({ joined: true }) : Promise.resolve([]),
      fetchGeneralFeed()
    ]).then(([communities, myCommunities, generalFeed]) => {
      setCommunities(communities)
      setMyCommunities(myCommunities)
      setGeneralFeed(generalFeed)
      setIsLoading(false)
    }).catch(error => {
      console.error('Failed to fetch data:', error)
      setIsLoading(false)
    })
  }, [isAuthenticated])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement subscription logic
    console.log('Subscribed:', email)
    setEmail('')
  }

  const handleCreateCommunity = async () => {
    if (!isAuthenticated) {
      setIsLoginDialogOpen(true)
      return
    }

    try {
      const newCommunity = await createCommunity({ name: newCommunityName, description: newCommunityDescription })
      setCommunities([...communities, newCommunity])
      setMyCommunities([...myCommunities, newCommunity])
      setNewCommunityName('')
      setNewCommunityDescription('')
    } catch (error) {
      console.error('Failed to create community:', error)
    }
  }

  const handleJoinCommunity = async (communityId: string) => {
    if (!isAuthenticated) {
      setIsLoginDialogOpen(true)
      return
    }

    try {
      await joinCommunity(communityId)
      const updatedCommunity = communities.find(c => c.id === communityId)
      if (updatedCommunity) {
        setMyCommunities([...myCommunities, updatedCommunity])
      }
    } catch (error) {
      console.error('Failed to join community:', error)
    }
  }

  const handlePostSubmit = async () => {
    if (!isAuthenticated) {
      setIsLoginDialogOpen(true)
      return
    }

    try {
      const newPostData = await createPost({ content: newPost })
      setGeneralFeed([newPostData, ...generalFeed])
      setNewPost('')
    } catch (error) {
      console.error('Failed to create post:', error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Delified Community Hub</h1>
        <p className="text-xl text-muted-foreground">Connect, Share, and Grow with Fellow Event Enthusiasts</p>
      </header>

      <Tabs defaultValue="discover" className="mb-16">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover">Discover Communities</TabsTrigger>
          <TabsTrigger value="myCommunities">My Communities</TabsTrigger>
          <TabsTrigger value="generalFeed">General Feed</TabsTrigger>
        </TabsList>
        <TabsContent value="discover">
          <Card>
            <CardHeader>
              <CardTitle>Discover New Communities</CardTitle>
              <CardDescription>Find and join communities that match your interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex mb-4">
                <Input
                  placeholder="Search communities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mr-2"
                />
                <Button>
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {communities.map((community) => (
                  <Card key={community.id}>
                    <CardHeader>
                      <CardTitle>{community.name}</CardTitle>
                      <CardDescription>{community.members} members • {community.posts} posts</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button onClick={() => handleJoinCommunity(community.id)}>Join Community</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="myCommunities">
          <Card>
            <CardHeader>
              <CardTitle>My Communities</CardTitle>
              <CardDescription>Communities you've joined or created</CardDescription>
            </CardHeader>
            <CardContent>
              {isAuthenticated ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {myCommunities.map((community) => (
                    <Card key={community.id}>
                      <CardHeader>
                        <CardTitle>{community.name}</CardTitle>
                        <CardDescription>{community.members} members • {community.posts} posts</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Link href={`/community/${community.id}`} passHref>
                          <Button variant="outline">View Community</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <p>Please log in to view your communities.</p>
              )}
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create New Community
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a New Community</DialogTitle>
                    <DialogDescription>
                      Start a new community to connect with like-minded event enthusiasts
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newCommunityName}
                        onChange={(e) => setNewCommunityName(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newCommunityDescription}
                        onChange={(e) => setNewCommunityDescription(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreateCommunity}>Create Community</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="generalFeed">
          <Card>
            <CardHeader>
              <CardTitle>General Feed</CardTitle>
              <CardDescription>Share your thoughts with the entire Delified community</CardDescription>
            </CardHeader>
            <CardContent>
              {isAuthenticated && (
                <div className="mb-4">
                  <Textarea
                    placeholder="What's on your mind?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="mb-2"
                  />
                  <Button onClick={handlePostSubmit}>Post</Button>
                </div>
              )}
              <div className="space-y-4">
                {generalFeed.map((post, index) => (
                  <Card key={post.id || index}>
                    <CardHeader>
                      <div className="flex items-center">
                        <Avatar className="mr-2">
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                          <AvatarFallback>{post.author_name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-sm">{post.author_name}</CardTitle>
                          <CardDescription>{new Date(post.created_at).toLocaleString()}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{post.content}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="mr-2">Like</Button>
                      <Button variant="outline">Comment</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
              <CardTitle>Communities</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <MessageCircle className="inline-block mb-2" size={48} />
              <p className="text-4xl font-bold">100+</p>
              <p className="text-muted-foreground">vibrant communities</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Daily Interactions</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CalendarDays className="inline-block mb-2" size={48} />
              <p className="text-4xl font-bold">10,000+</p>
              <p className="text-muted-foreground">posts, comments, and likes</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Join Our Newsletter</CardTitle>
            <CardDescription>Stay updated with the latest community news and events</CardDescription>
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

      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to perform this action.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={async (e) => {
            e.preventDefault()
            try {
              const response = await login({ email: loginEmail, password: loginPassword })
              localStorage.setItem('auth_token', response.token)
              setIsAuthenticated(true)
              setIsLoginDialogOpen(false)
              setLoginEmail('')
              setLoginPassword('')
              setLoginError('')
              router.push('/community')
            } catch (error) {
              setLoginError('Login failed. Please check your credentials.')
            }
          }}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={loginEmail} 
                  onChange={(e) => setLoginEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={loginPassword} 
                  onChange={(e) => setLoginPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>
            {loginError && <p className="text-red-500 mt-4">{loginError}</p>}
            <DialogFooter className="mt-4">
              <Button type="submit">Login</Button>
              <Button variant="outline" onClick={() => setIsLoginDialogOpen(false)}>Cancel</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

