import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Mail, FileText } from 'lucide-react'
import Link from "next/link"

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Support Center</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Welcome to the Delified Support Center. How can we help you today?
      </p>

      <Tabs defaultValue="general" className="mb-8">
        <TabsList>
          <TabsTrigger value="general">General Support</TabsTrigger>
          <TabsTrigger value="technical">Technical Support</TabsTrigger>
          <TabsTrigger value="billing">Billing Support</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Support</CardTitle>
              <CardDescription>Get help with general inquiries about Delified</CardDescription>
            </CardHeader>
            <CardContent>
              <p>For general questions about our services, MUN events, or participation, please check our FAQs or contact us directly.</p>
              <div className="flex gap-4 mt-4">
                <Link href="/faqs">
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    View FAQs
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="technical">
          <Card>
            <CardHeader>
              <CardTitle>Technical Support</CardTitle>
              <CardDescription>Get help with technical issues on our platform</CardDescription>
            </CardHeader>
            <CardContent>
              <p>If you're experiencing technical difficulties with our website or during online MUN sessions, our tech team is here to help.</p>
              <Button className="mt-4">
                <MessageCircle className="mr-2 h-4 w-4" />
                Start Live Chat
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Support</CardTitle>
              <CardDescription>Get help with payments and subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <p>For questions about payments, refunds, or subscription issues, please contact our billing department.</p>
              <Link href="/contact">
                <Button className="mt-4">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Billing Support
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <h2 className="text-2xl font-semibold mb-4">Popular Support Topics</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Registration Process</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Learn how to register for MUN conferences through our platform.</p>
            <Link href="/faqs#registration">
              <Button variant="link" className="mt-2 p-0">Read more</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Preparing for MUN</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Get tips and resources to prepare for your MUN conference.</p>
            <Link href="/mun-guide">
              <Button variant="link" className="mt-2 p-0">View MUN Guide</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Technical Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Check the technical requirements for participating in online MUNs.</p>
            <Link href="/faqs#technical">
              <Button variant="link" className="mt-2 p-0">View Requirements</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}