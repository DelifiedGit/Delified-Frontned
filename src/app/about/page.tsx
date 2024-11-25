import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#E03D8D]">About Dublieu MUNs</h1>
      
      {/* How We Started */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Our Journey</h2>
        <p className="text-lg mb-4">
          Dublieu MUNs was born in 2020 from a passion for Model United Nations and a vision to make these 
          transformative experiences accessible to students across India. What started as a small team of MUN 
          enthusiasts has grown into India's leading platform for MUN conferences, competitions, and resources.
        </p>
        <Image 
          src="/placeholder.jpeg" 
          alt="Dublieu MUNs Journey" 
          width={800} 
          height={400} 
          className="rounded-lg mx-auto"
        />
      </section>

      {/* What We Do */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">What We Do</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Connect</CardTitle>
            </CardHeader>
            <CardContent>
              We connect students with MUN conferences, competitions, and fellowships across India, 
              providing a centralized platform for opportunities.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Educate</CardTitle>
            </CardHeader>
            <CardContent>
              Through our comprehensive MUN guides and resources, we empower students with the 
              knowledge and skills to excel in Model United Nations.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Empower</CardTitle>
            </CardHeader>
            <CardContent>
              We empower organizers with tools and support to create impactful MUN conferences, 
              fostering a vibrant community of future leaders.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">A Note from Our Founder</h2>
        <Card>
          <CardContent className="flex flex-col md:flex-row items-center p-6">
            <Image 
              src="/placeholder.jpeg" 
              alt="Founder's Photo" 
              width={200} 
              height={200} 
              className="rounded-full mb-4 md:mb-0 md:mr-6"
            />
            <div>
              <p className="text-lg mb-4">
                "Dublieu MUNs was born from a simple idea: to make the transformative experience of 
                Model United Nations accessible to every student in India. Our journey has been one of 
                passion, perseverance, and the unwavering belief in the power of youth to shape our world. 
                As we continue to grow, our commitment remains the same – to empower the next generation 
                of leaders, thinkers, and changemakers."
              </p>
              <p className="font-semibold">- Aanya Sharma, Founder & CEO</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Meet the Team */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Meet the Team</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { name: "Aanya Sharma", role: "Founder & CEO" },
            { name: "Rahul Kapoor", role: "Chief Technology Officer" },
            { name: "Priya Patel", role: "Head of Operations" },
            { name: "Arjun Mehta", role: "Community Manager" },
          ].map((member) => (
            <Card key={member.name}>
              <CardContent className="text-center p-6">
                <Image 
                  src="/placeholder.jpeg" 
                  alt={member.name} 
                  width={150} 
                  height={150} 
                  className="rounded-full mx-auto mb-4"
                />
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Impact */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Our Impact</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-[#E03D8D] mb-2">100+</p>
            <p className="text-xl">MUN Conferences Listed</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#E03D8D] mb-2">50,000+</p>
            <p className="text-xl">Students Reached</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#E03D8D] mb-2">20+</p>
            <p className="text-xl">Cities Across India</p>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4">Join the Dublieu MUNs Community</h2>
        <p className="text-lg mb-6">
          Whether you're a student looking to participate in MUNs or an organizer wanting to host one, 
          we're here to support your journey.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild className="bg-[#E03D8D] hover:bg-[#E03D8D]/90 text-white">
            <Link href="/signup">Sign Up Now</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}