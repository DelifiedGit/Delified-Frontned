'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Users, MessageCircle, Calendar, Heart, Share2, Sparkles, Bell, BookMarked, Moon, Sun } from 'lucide-react'
import { fetchCommunityDetails, createCommunityPost, fetchCommunityMembers, fetchCommunityEvents, fetchCommunityPosts, likePost, fetchComments, createComment } from '@/lib/api'
import { cn, generateGradient, emojis } from '@/lib/utils'

interface CommunityData {
  id: string;
  name: string;
  description: string;
  members_count: number;
  posts_count: number;
  posts?: Post[];
}

interface Post {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
  likes_count: number;
  is_liked: boolean;
  comments: Comment[];
}

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

interface Member {
  id: string;
  full_name: string;
  institution: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
}

export default function CommunityView() {
  const params = useParams()
  const communityId = params.id as string
  const [communityData, setCommunityData] = useState<CommunityData | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [newPost, setNewPost] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)


  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [communityDetails, communityMembers, communityEvents, communityPosts] = await Promise.all([
        fetchCommunityDetails(communityId),
        fetchCommunityMembers(communityId),
        fetchCommunityEvents(communityId),
        fetchCommunityPosts(communityId, 1)
      ])
      setCommunityData(communityDetails)
      setMembers(communityMembers)
      setEvents(communityEvents)
      setPosts(communityPosts.results)
      setHasMore(!!communityPosts.next)
      setCurrentPage(1)
    } catch (error) {
      console.error('Failed to fetch community data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [communityId])

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      fetchData()
    }
  }, [communityId])

  const handlePostSubmit = async () => {
    if (!newPost.trim()) return

    try {
      const newPostData = await createCommunityPost(communityId, { content: newPost })
      setPosts(prevPosts => Array.isArray(prevPosts) ? [newPostData, ...prevPosts] : [newPostData])
      setNewPost('')
    } catch (error) {
      console.error('Failed to create post:', error)
    }
  }

  const handleLike = async (postId: string) => {
    try {
      const result = await likePost(postId)
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, is_liked: result.liked, likes_count: result.liked ? post.likes_count + 1 : post.likes_count - 1 }
            : post
        )
      )
    } catch (error) {
      console.error('Failed to like/unlike post:', error)
    }
  }

  const handleComment = async (postId: string, content: string) => {
    try {
      const newComment = await createComment(postId, content)
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      )
    } catch (error) {
      console.error('Failed to create comment:', error)
    }
  }

  const loadMorePosts = async () => {
    if (!hasMore) return

    try {
      const nextPage = currentPage + 1
      const morePosts = await fetchCommunityPosts(communityId, nextPage)
      setPosts(prevPosts => [...prevPosts, ...morePosts.results])
      setCurrentPage(nextPage)
      setHasMore(!!morePosts.next)
    } catch (error) {
      console.error('Failed to load more posts:', error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!communityData) {
    return <div>Community not found</div>
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-100 via-violet-200 to-cyan-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 bg-white/60 backdrop-blur-lg border-none shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  {communityData?.name}
                </CardTitle>
              </div>
              <CardDescription className="text-gray-600">{communityData?.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    <Users className="mr-2 h-4 w-4" />
                    {communityData?.members_count} squad members
                  </Badge>
                  <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {communityData?.posts_count} vibes shared
                  </Badge>
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                  <Users className="mr-2 h-4 w-4" /> Invite Squad Members
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/60 backdrop-blur-lg border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Squad Vibes 😎
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Share your thoughts with the squad! 🚀"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="mb-4 bg-white/20 backdrop-blur-lg border-none placeholder-gray-500 text-gray-800"
                />
                <Button onClick={handlePostSubmit} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                  <Sparkles className="mr-2 h-4 w-4" /> Share Vibe
                </Button>
                <Separator className="my-6" />
                <ScrollArea className="h-[600px] pr-4">
                  <motion.div
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
                    className="space-y-4"
                  >
                    {posts && posts.length > 0 ? (
                      posts.map((post) => (
                        <motion.div
                          key={post.id}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                          }}
                        >
                          <Card className="bg-white/20 backdrop-blur-lg border-none shadow-md hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                              <div className="flex items-center">
                                <Avatar className="mr-2 ring-2 ring-purple-500">
                                  <AvatarImage src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${post.author_name}`} alt={post.author_name} />
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
                            <div className="px-6 py-4">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  className="text-pink-600 hover:text-pink-700"
                                  onClick={() => handleLike(post.id)}
                                >
                                  <Heart className={`mr-2 h-4 w-4 ${post.is_liked ? 'fill-current' : ''}`} />
                                  {post.likes_count}
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
                            {post.comments && post.comments.length > 0 && (
                              <CardContent>
                                <h4 className="mb-2 font-semibold text-purple-600">Comments</h4>
                                <div className="space-y-2">
                                  {post.comments.map((comment) => (
                                    <div key={comment.id} className="bg-white/40 rounded-lg p-3">
                                      <div className="flex items-center mb-1">
                                        <Avatar className="h-6 w-6 mr-2">
                                          <AvatarImage src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${comment.author_name}`} alt={comment.author_name} />
                                          <AvatarFallback>{comment.author_name[0]}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium text-gray-800">{comment.author_name}</span>
                                      </div>
                                      <p className="text-sm text-gray-700">{comment.content}</p>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            )}
                          </Card>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">No vibes shared yet. Be the first to drop a message! 🎉</p>
                    )}
                  </motion.div>
                  {hasMore && (
                    <div className="mt-4 text-center">
                      <Button onClick={loadMorePosts} variant="outline" className="bg-white/20 backdrop-blur-lg border-none text-purple-600 hover:text-purple-700">
                        Load More Vibes
                      </Button>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              <Card className="bg-white/60 backdrop-blur-lg border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-600">
                    <Calendar className="mr-2" /> Upcoming Squad Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px]">
                    {events && events.length > 0 ? (
                      <div className="space-y-4">
                        {events.map((event) => (
                          <div key={event.id} className="flex items-center p-2 hover:bg-white/20 rounded-lg transition-colors">
                            <div className="flex-1">
                              <p className="font-medium text-purple-700">{event.name}</p>
                              <p className="text-sm text-purple-600">{new Date(event.date).toLocaleString()}</p>
                            </div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm" className="text-purple-600">
                                    <Bell className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Set reminder</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500">No upcoming events. Stay tuned! 🎉</p>
                    )}
                  </ScrollArea>
                  <Button variant="outline" className="w-full mt-4 bg-white/20 backdrop-blur-lg border-none text-purple-600 hover:text-purple-700">
                    View All Events
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-lg border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-600">
                    <Users className="mr-2" /> Squad Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    {members && members.length > 0 ? (
                      <div className="space-y-4">
                        {members.map((member) => (
                          <div key={member.id} className="flex items-center p-2 hover:bg-white/20 rounded-lg transition-colors">
                            <Avatar className="mr-2 ring-2 ring-purple-500">
                              <AvatarImage src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${member.full_name}`} alt={member.full_name} />
                              <AvatarFallback>{member.full_name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium text-purple-700">{member.full_name}</p>
                              <p className="text-sm text-purple-600">{member.institution}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500">No members yet. Invite some friends to join the squad! 🚀</p>
                    )}
                  </ScrollArea>
                  <Button variant="outline" className="w-full mt-4 bg-white/20 backdrop-blur-lg border-none text-purple-600 hover:text-purple-700">
                    View All Members
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )

}

