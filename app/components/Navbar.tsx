"use client"

import React, { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { Menu, X, User, LogOut, LogIn, MessageSquare, Briefcase, BookOpen } from "lucide-react"

const NavLink = ({
  href,
  children,
  className,
  onClick,
}: {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}) => (
  <a href={href} className={className} onClick={onClick}>
    {children}
  </a>
)

const NavItems = [
  { href: "/resources/notes", label: "Notes", icon: BookOpen },
  { href: "/resources/papers", label: "Papers", icon: MessageSquare },
  { href: "/marketplace", label: "Marketplace", icon: Briefcase },
  { href: "/dashboard", label: "Dashboard", icon: User },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()
  const user = session?.user

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 shadow-xl border-b border-slate-800 text-white font-inter">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink href="/" className="text-2xl font-extrabold text-white flex">
            <BookOpen className="text-white w-6 h-6 m-2" />
            CampusCrew
          </NavLink>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex md:space-x-6 items-center text-sm font-medium">
            {NavItems.map((item) => (
              <NavLink key={item.href} href={item.href} className="hover:text-indigo-400 transition duration-150">
                {item.label}
              </NavLink>
            ))}

            {!user ? (
              <button
                onClick={() => signIn()}
                className="ml-4 flex items-center px-4 py-2 bg-indigo-600 rounded-full text-white font-bold text-sm shadow-lg hover:bg-indigo-500 transition duration-200"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In / Register
              </button>
            ) : (
              <UserDropdown user={user} handleSignOut={() => signOut()} />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-300 hover:text-indigo-400 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function UserDropdown({ user, handleSignOut }: { user: any; handleSignOut: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-800 transition"
      >
        <User className="h-8 w-8 rounded-full bg-indigo-600 p-1 text-white" />
        <span className="hidden lg:inline text-sm font-medium text-slate-200">{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 rounded-xl shadow-2xl bg-slate-700 ring-1 ring-black ring-opacity-5 z-50">
          <div className="px-4 py-2 text-sm text-white border-b border-slate-600">
            <p className="font-bold">{user.name}</p>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
          </div>
          <NavLink href="/profile" className="flex items-center px-4 py-2 text-sm text-slate-200 hover:bg-slate-600">
            <User className="w-4 h-4 mr-3" />
            Profile Settings
          </NavLink>
          <button
            onClick={handleSignOut}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-300 hover:bg-slate-600 border-t border-slate-600"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
