"use client"

import { useState } from "react"
import Link from "next/link"
import { Square, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-transparent py-4 px-6 relative z-20">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-gray-800">
          <div className="bg-emerald-500 text-white p-2 rounded-md">
            <Square className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold">Ride Application</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/search" className="text-gray-800 hover:text-emerald-600">
            Search
          </Link>
          <Link href="/ride-up" className="text-gray-800 hover:text-emerald-600">
            Ride Up
          </Link>
          <Link href="/sharing" className="text-gray-800 hover:text-emerald-600">
            Sharing
          </Link>
          <Link href="/destination" className="text-gray-800 hover:text-emerald-600">
            Destination
          </Link>
          <Link href="/doors" className="text-gray-800 hover:text-emerald-600">
            Doors
          </Link>
        </div>

        {/* User and Search */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="rounded-full">
            Search
          </Button>
          <Button className="rounded-full bg-emerald-500 hover:bg-emerald-600">Start</Button>
        </div>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-4 z-30">
          <div className="flex flex-col gap-4">
            <Link href="/search" className="text-gray-800 hover:text-emerald-600 py-2">
              Search
            </Link>
            <Link href="/ride-up" className="text-gray-800 hover:text-emerald-600 py-2">
              Ride Up
            </Link>
            <Link href="/sharing" className="text-gray-800 hover:text-emerald-600 py-2">
              Sharing
            </Link>
            <Link href="/destination" className="text-gray-800 hover:text-emerald-600 py-2">
              Destination
            </Link>
            <Link href="/doors" className="text-gray-800 hover:text-emerald-600 py-2">
              Doors
            </Link>
            <Button className="w-full rounded-full bg-emerald-500 hover:bg-emerald-600">Start</Button>
          </div>
        </div>
      )}
    </nav>
  )
}

