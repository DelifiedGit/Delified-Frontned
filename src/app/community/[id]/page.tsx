'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Users, MessageCircle, Calendar, Heart } from 'lucide-react'
import { fetchCommunityDetails, createCommunityPost, fetchCommunityMembers, fetchCommunityEvents, fetchCommunityPosts, likePost, fetchComments, createComment } from '@/lib/api'

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [communityDetails, communityMembers, communityEvents, communityPosts] = await Promise.all([
          fetchCommunityDetails(communityId),
          fetchCommunityMembers(communityId),
          fetchCommunityEvents(communityId),
          fetchCommunityPosts(communityId)
        ])
        setCommunityData(communityDetails)
        setMembers(communityMembers)
        setEvents(communityEvents)
        setPosts(communityPosts.results)
        setHasMore(!!communityPosts.next)
      } catch (error) {
        console.error('Failed to fetch community data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [communityId])

  const handlePostSubmit = async () => {
    if (!newPost.trim()) return

    try {
      const newPostData = await createCommunityPost(communityId, { content: newPost })
      setPosts(prevPosts => [newPostData, ...prevPosts])
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
                <span>{communityData.members_count} members</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="mr-2 h-4 w-4" />
                <span>{communityData.posts_count} posts</span>
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
                {posts && posts.length > 0 ? (
                  posts.map((post) => (
                    <Card key={post.id} className="mb-4">
                      <CardHeader>
                        <div className="flex items-center">
                          <Avatar className="mr-2">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={post.author_name} />
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
                        <Button
                          variant="outline"
                          className="mr-2"
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart className={`mr-2 h-4 w-4 ${post.is_liked ? 'fill-current text-red-500' : ''}`} />
                          Like ({post.likes_count})
                        </Button>
                        <Button variant="outline" onClick={() => handleComment(post.id, 'Test comment')}>Comment</Button>
                      </CardFooter>
                      {post.comments.length > 0 && (
                        <CardContent>
                          <h4 className="mb-2 font-semibold">Comments:</h4>
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="mb-2">
                              <p className="text-sm font-medium">{comment.author_name}</p>
                              <p className="text-sm">{comment.content}</p>
                            </div>
                          ))}
                        </CardContent>
                      )}
                    </Card>
                  ))
                ) : (
                  <p>No posts yet.</p>
                )}
                {hasMore && (
                  <Button onClick={loadMorePosts} className="w-full mt-4">
                    Load More
                  </Button>
                )}
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
                {events && events.length > 0 ? (
                  events.map((event) => (
                    <div key={event.id} className="flex items-center mb-4">
                      <Calendar className="mr-2 h-4 w-4" />
                      <div>
                        <p className="font-medium">{event.name}</p>
                        <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No upcoming events.</p>
                )}
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
                {members && members.length > 0 ? (
                  members.map((member) => (
                    <div key={member.id} className="flex items-center mb-4">
                      <Avatar className="mr-2">
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={member.full_name} />
                        <AvatarFallback>{member.full_name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.full_name}</p>
                        <p className="text-sm text-muted-foreground">{member.institution}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No members yet.</p>
                )}
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

