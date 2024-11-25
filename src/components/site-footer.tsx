import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#0F172A] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">FOR EVENT ORGANIZERS</h2>
          <p className="text-gray-400 max-w-3xl">
            Delified is built by a team that understands what goes into organizing great Model UN conferences. 
            Our technology, marketing, and customer support can help you build a community of not just participants, 
            but passionate MUN enthusiasts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="font-bold">ABOUT US</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">About Delified</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold">FOR ORGANIZERS</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/list-mun" className="text-gray-400 hover:text-white">List Your MUN</Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white">Support</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold">SUPPORT</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link>
              </li>
              
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold">FOLLOW US</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-gray-400">© 2024 Delified. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="bg-[#E03D8D] hover:bg-[#E03D8D]/90 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}