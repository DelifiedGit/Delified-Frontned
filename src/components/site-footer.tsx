import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SiteFooter() {
  return (
    <footer className="w-full bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-400">FOR EVENT ORGANIZERS</h2>
          <p className="text-gray-300 max-w-3xl">
            Delified is built by a team that understands what goes into organizing great Model UN conferences. 
            Our technology, marketing, and customer support can help you build a community of not just participants, 
            but passionate MUN enthusiasts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { title: "ABOUT US", links: [{ text: "About Delified", href: "/about" }] },
            { title: "FOR ORGANIZERS", links: [{ text: "List Your MUN", href: "/list-mun" }, { text: "Support", href: "/support" }] },
            { title: "SUPPORT", links: [{ text: "Contact Us", href: "/contact" }] },
            { title: "FOLLOW US", social: true },
          ].map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-bold text-lg">{section.title}</h3>
              {section.social ? (
                <div className="flex space-x-4">
                  {[Facebook, Instagram, Twitter].map((Icon, i) => (
                    <Link key={i} href="#" className="text-gray-400 hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </Link>
                  ))}
                </div>
              ) : (
                <ul className="space-y-2">
                  {section.links?.map((link, i) => (
                    <li key={i}>
                      <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
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
              <Button className="bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

