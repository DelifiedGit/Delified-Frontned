'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CalendarDays, Users, MessageCircle, Plus, Search, Sparkles, TrendingUp, Heart, Share2, BookMarked, Moon, Sun } from 'lucide-react'
import { fetchCommunities, createCommunity, joinCommunity, fetchGeneralFeed, createPost, login } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { cn, generateGradient, emojis } from '@/lib/utils'

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
  likes_count: string;
  comments: string
  
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
  const [trendingTopics, setTrendingTopics] = useState(['#MUNPrep', '#GlobalAffairs', '#ClimateAction', '#YouthLeadership', '#TechForGood']);
  
  

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
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-100 via-violet-200 to-cyan-100">
      <div className="container mx-auto px-4 py-8">
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Delified Squad Hub
          </h1>
          <p className="text-xl text-gray-600">
            Where Gen Z Changemakers Connect, Vibe, and Thrive 🚀
          </p>
        </motion.header>

        <div className="flex justify-between items-center mb-8">
          <Input
            placeholder="🔍 Search communities, topics, or squad members"
            className="w-2/3 bg-white/20 backdrop-blur-lg border-none placeholder-gray-500 text-gray-800"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-3">
            <Tabs defaultValue="discover" className="w-full">
              <TabsList className="w-full flex space-x-2 bg-transparent mb-6">
                <TabsTrigger 
                  value="discover" 
                  className="flex-1 bg-white/20 backdrop-blur-lg data-[state=active]:bg-violet-600 data-[state=active]:text-white rounded-full transition-all duration-200"
                >
                  🔥 Discover Squads
                </TabsTrigger>
                <TabsTrigger 
                  value="mySquads" 
                  className="flex-1 bg-white/20 backdrop-blur-lg data-[state=active]:bg-violet-600 data-[state=active]:text-white rounded-full transition-all duration-200"
                >
                  🚀 My Squads
                </TabsTrigger>
                <TabsTrigger 
                  value="vibeCheck" 
                  className="flex-1 bg-white/20 backdrop-blur-lg data-[state=active]:bg-violet-600 data-[state=active]:text-white rounded-full transition-all duration-200"
                >
                  😎 Vibe Check
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="discover">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      {communities.map((community) => (
                        <Card key={community.id} className="bg-white/60 backdrop-blur-lg border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                          <CardHeader className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <CardTitle className="relative z-10 text-white group-hover:scale-105 transition-transform duration-300">
                              {community.name}
                            </CardTitle>
                            <CardDescription className="relative z-10 text-white/80">
                              {community.members} squad members • {community.posts} vibes shared
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="relative z-10">
                            <p className="text-gray-700 mb-4">
                              Join this squad to connect with like-minded changemakers!
                            </p>
                            <div className="flex space-x-2">
                              {['#GlobalCitizen', '#Innovation', '#Sustainability'].map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-white/20 text-gray-800">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                          <div className="px-6 py-4 flex justify-between items-center">
                            <Button 
                              onClick={() => handleJoinCommunity(community.id)}
                              className="bg-violet-600 hover:bg-violet-700 text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                            >
                              <Users className="mr-2 h-4 w-4" />
                              Join Squad
                            </Button>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" className="text-gray-600">
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Share this squad</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="mySquads">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isAuthenticated ? (
                      <div className="grid md:grid-cols-2 gap-6">
                        {myCommunities.map((community) => (
                          <Card key={community.id} className="bg-white/60 backdrop-blur-lg border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                            <CardHeader className="relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600 opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <CardTitle className="relative z-10 text-white group-hover:scale-105 transition-transform duration-300">
                                {community.name}
                              </CardTitle>
                              <CardDescription className="relative z-10 text-white/80">
                                {community.members} squad members • {community.posts} vibes shared
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="relative z-10">
                              <p className="text-gray-700 mb-4">
                                Stay active and engaged with your squad!
                              </p>
                              <div className="flex space-x-2">
                                {['#SquadGoals', '#Collaboration', '#Impact'].map((tag) => (
                                  <Badge key={tag} variant="secondary" className="bg-white/20 text-gray-800">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                            <div className="px-6 py-4 flex justify-between items-center">
                              <Link href={`/community/${community.id}`} passHref>
                                <Button className="bg-violet-600 hover:bg-violet-700 text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                                  View Squad
                                </Button>
                              </Link>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" className="text-gray-600">
                                      <BookMarked className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Bookmark this squad</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-xl text-gray-600 mb-4">
                          Log in to view your squads and start vibing! 🚀
                        </p>
                        <Button onClick={() => setIsLoginDialogOpen(true)} className="bg-violet-600 hover:bg-violet-700 text-white">
                          Get Started
                        </Button>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>

                <TabsContent value="vibeCheck">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white/60 backdrop-blur-lg border-none shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                          Squad Vibe Check 😎
                        </CardTitle>
                        <CardDescription>Share your thoughts and connect with the Delified community</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {isAuthenticated && (
                          <div className="mb-6">
                            <Textarea
                              placeholder="What's on your mind? Share your vibe with the squad! 🚀"
                              value={newPost}
                              onChange={(e) => setNewPost(e.target.value)}
                              className="mb-4 bg-white/20 backdrop-blur-lg border-none placeholder-gray-500 text-gray-800"
                            />
                            <Button onClick={handlePostSubmit} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                              <Sparkles className="mr-2 h-4 w-4" /> Share Vibe
                            </Button>
                          </div>
                        )}
                        <ScrollArea className="h-[600px] pr-4">
                          <motion.div 
                            className="space-y-4"
                            variants={{
                              hidden: { opacity: 0 },
                              show: {
                                opacity: 1,
                                transition: {
                                  staggerChildren: 0.1
                                }
                              }
                            }}
                            initial="hidden"
                            animate="show"
                          >
                            {generalFeed.map((post, index) => (
                              <motion.div
                                key={post.id || index}
                                variants={{
                                  hidden: { opacity: 0, y: 20 },
                                  show: { opacity: 1, y: 0 }
                                }}
                              >
                                <Card className="bg-white/60 backdrop-blur-lg border-none shadow-md hover:shadow-lg transition-all duration-300">
                                  <CardHeader>
                                    <div className="flex items-center">
                                      <Avatar className="mr-2 ring-2 ring-purple-500">
                                        <AvatarImage src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${post.author_name}`} />
                                        <AvatarFallback>{post.author_name[0]}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <CardTitle className="text-sm text-gray-800">{post.author_name}</CardTitle>
                                        <CardDescription className="text-gray-600">{new Date(post.created_at).toLocaleString()}</CardDescription>
                                      </div>
                                      <Button variant="ghost" size="sm" className="text-gray-600">
                                        <Share2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-gray-800">{post.content}</p>
                                  </CardContent>
                                  <div className="px-6 py-4 flex justify-between">
                                    <div className="flex space-x-2">
                                      <Button variant="ghost" className="text-pink-600 hover:text-pink-700">
                                        <Heart className="mr-2 h-4 w-4" />
                                        {post.likes_count || 0}
                                      </Button>
                                      <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        {post.comments?.length || 0}
                                      </Button>
                                    </div>
                                    <div className="flex space-x-1">
                                      {emojis.map((emoji, index) => (
                                        <Button key={index} variant="ghost" size="sm" className="px-2 hover:bg-gray-200">
                                          {emoji}
                                        </Button>
                                      ))}
                                    </div>
                                  </div>
                                </Card>
                              </motion.div>
                            ))}
                          </motion.div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </div>

          <div>
            <Card className="bg-white/60 backdrop-blur-lg border-none shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  🔥 Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingTopics.map((topic, index) => (
                    <Badge 
                      key={index}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white cursor-pointer hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-lg border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  📊 Community Pulse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Active Squads</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Vibe Check</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Engagement Rate</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Squad Highlights 🌟
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/60 backdrop-blur-lg border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-center text-gray-800">Active Changemakers</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Users className="inline-block mb-2 text-purple-500" size={48} />
                <p className="text-4xl font-bold text-purple-600">5,000+</p>
                <p className="text-gray-600">and growing every day</p>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-lg border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-center text-gray-800">Vibrant Squads</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <MessageCircle className="inline-block mb-2 text-pink-500" size={48} />
                <p className="text-4xl font-bold text-pink-600">100+</p>
                <p className="text-gray-600">thriving communities</p>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur-lg border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-center text-gray-800">Daily Interactions</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Sparkles className="inline-block mb-2 text-yellow-500" size={48} />
                <p className="text-4xl font-bold text-yellow-600">10,000+</p>
                <p className="text-gray-600">vibes, comments, and reactions</p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-white/60 backdrop-blur-lg border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Join the Vibe Tribe 🎉
              </CardTitle>
              <CardDescription className="text-gray-600">
                Stay updated with the latest squad news and epic events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubscribe} className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Drop your email here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/20 backdrop-blur-lg border-none placeholder-gray-500 text-gray-800"
                />
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                  Join the Tribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.section>

        <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
          <DialogContent className="bg-white/95 dark:bg-gray-800/95 backdrop-filter backdrop-blur-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Join the Squad 🚀
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Log in to unlock the full Delified experience!
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
                    className="bg-white/20 backdrop-blur-lg border-none"
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
                    className="bg-white/20 backdrop-blur-lg border-none"
                  />
                </div>
              </div>
              {loginError && <p className="text-red-500 mt-4">{loginError}</p>}
              <DialogFooter className="mt-6">
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                  Let's Go!
                </Button>
                <Button variant="outline" onClick={() => setIsLoginDialogOpen(false)} className="bg-white/20 backdrop-blur-lg border-none text-gray-800">
                  Maybe Later
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )

}

