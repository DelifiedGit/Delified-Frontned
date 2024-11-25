'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, Search, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
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
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#0F172A] text-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="text-white">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] bg-[#0F172A] text-white">
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
                      <Link href="/muns" className="text-sm hover:text-[#E03D8D] transition-colors">MUNs</Link>
                      <Link href="/mun-guide" className="text-sm hover:text-[#E03D8D] transition-colors">MUN Guide</Link>
                      {isLoggedIn && (
                        <Link href="/dashboard" className="text-sm hover:text-[#E03D8D] transition-colors">Dashboard</Link>
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
              <Link href="/muns" className="text-sm hover:text-[#E03D8D] transition-colors">MUNs</Link>
              <Link href="/mun-guide" className="text-sm hover:text-[#E03D8D] transition-colors">MUN Guide</Link>
              {isLoggedIn && (
                <Link href="/dashboard" className="text-sm hover:text-[#E03D8D] transition-colors">Dashboard</Link>
              )}
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-white">
                <Search className="h-5 w-5" />
              </Button>
              <Link href="/list-mun">
                <Button className="bg-[#E03D8D] hover:bg-[#E03D8D]/90 text-white">
                  List MUN
                </Button>
              </Link>
              {isLoggedIn ? (
                <Button onClick={handleLogout} className="bg-[#E03D8D] hover:bg-[#E03D8D]/90 text-white">
                  Logout
                </Button>
              ) : (
                <>
                  <Link href="/login">
                    <Button className="bg-[#E03D8D] hover:bg-[#E03D8D]/90 text-white">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-[#E03D8D] hover:bg-[#E03D8D]/90 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}