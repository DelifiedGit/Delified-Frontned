'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, Search, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { logout } from '@/lib/api'

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      setIsLoggedIn(false)
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const navItems = [
    { name: 'MUNs', href: '/muns' },
    { name: 'Debates', href: '/debates' },
    { name: 'Workshops', href: '/workshops' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="sticky top-0 z-50 w-full bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-md"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-white">
                <nav className="flex flex-col gap-4">
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="/logo.jpg"
                      alt="Delified Logo"
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                  </Link>
                  <div className="grid gap-2">
                    {navItems.map((item) => (
                      <Link key={item.name} href={item.href} className="text-sm hover:text-indigo-600 transition-colors">
                        {item.name}
                      </Link>
                    ))}
                    <Link href="/mun-guide" className="text-sm hover:text-indigo-600 transition-colors">MUN Guide</Link>
                    {isLoggedIn && (
                      <Link href="/dashboard" className="text-sm hover:text-indigo-600 transition-colors">Dashboard</Link>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.jpg"
                alt="Delified Logo"
                width={120}
                height={120}
                className="rounded-lg"
              />
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="flex items-center text-sm hover:text-indigo-600 transition-colors">
                  Events <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <div className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <Link key={item.name} href={item.href} className="text-sm hover:text-indigo-600 transition-colors">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Link href="/mun-guide" className="text-sm hover:text-indigo-600 transition-colors">MUN Guide</Link>           
            {isLoggedIn && (
              <Link href="/dash" className="text-sm hover:text-indigo-600 transition-colors">Dashboard</Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            
            {isLoggedIn ? (
              <Button onClick={handleLogout} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Logout
              </Button>
            ) : (
              // <Link href="/signup">
              //   <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              //     Sign Up
              //   </Button>
              // </Link>
              <Link href="/signup">
              <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Now
            </motion.button>
            </Link>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}

