'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, LogIn, MessageSquare, Briefcase, BookOpen, Link } from 'lucide-react';

// Custom Link component using a standard anchor tag <a> for compatibility
type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const NavLink: React.FC<NavLinkProps> = ({ href, children, className, onClick }) => (
  <a href={href} className={className} onClick={onClick}>
    {children}
  </a>
);

// --- MOCK AUTHENTICATION SYSTEM ---
// In a real application, you would replace this with actual NextAuth imports (useSession, signIn, signOut).

const INITIAL_MOCK_USER = {
  name: "A. Student",
  email: "a.student@campuscrew.edu"
};

const useMockSession = () => {
  // Start with an authenticated user for easy demonstration of the UserDropdown UI
  const [user, setUser] = useState<{ name: string; email: string } | null>(INITIAL_MOCK_USER);

  // No need for useEffect timeout since we start authenticated

  return {
    data: user ? { user } : null,
    status: user ? 'authenticated' : 'unauthenticated',
    user,
    setUser
  };
};

const mockSignIn = (provider: string) => {
  console.log(`Simulating sign in with ${provider}...`);
  // After a successful login via Google/LinkedIn, return the user object
  return INITIAL_MOCK_USER;
};

const mockSignOut = () => {
  console.log("Simulating sign out...");
};
// --- END MOCK AUTHENTICATION SYSTEM ---


const NavItems = [
  { href: "/resources/notes", label: "Notes", icon: BookOpen },
  { href: "/resources/papers", label: "Papers", icon: MessageSquare },
  { href: "/marketplace", label: "Marketplace", icon: Briefcase },
  { href: "/dashboard", label: "Dashboard", icon: User },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useMockSession(); // Using the mock hook

  // Simulate full sign in/out logic
  const handleSignIn = async (provider: string) => {
    const newUser = mockSignIn(provider);
    if (newUser) {
      setUser(newUser);
      setIsMenuOpen(false);
    }
  };

  const handleSignOut = () => {
    mockSignOut();
    setUser(null);
    setIsMenuOpen(false);
  };

  const menuClass = "transition-all duration-300 ease-in-out";

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 shadow-xl border-b border-slate-800 text-white font-inter">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <NavLink href="/" className="text-2xl font-extrabold text-indigo-400 tracking-wider">
            CampusCrew
          </NavLink>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex md:space-x-6 items-center text-sm font-medium">
            {NavItems.map((item) => (
              <NavLink key={item.href} href={item.href} className="hover:text-indigo-400 transition duration-150">
                {item.label}
              </NavLink>
            ))}

            {/* Conditional Auth Button (Desktop) */}
            {!user ? (
              <button
                // In a real app, this is where you'd call signIn('google') 
                onClick={() => handleSignIn('Google')}
                className="ml-4 flex items-center px-4 py-2 bg-indigo-600 rounded-full text-white font-bold text-sm shadow-lg hover:bg-indigo-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <LogIn className="w-4 h-4 mr-2" />
                <Link href='/auth/register'></Link> Sign In / Register
              </button>
            ) : (
              // Display User Dropdown when authenticated
              <UserDropdown user={user} handleSignOut={handleSignOut} />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-300 hover:text-indigo-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Sliding Panel) */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-sm md:hidden ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
          } ${menuClass}`}
      >
        <div className="pt-16 px-4 pb-3 space-y-2 border-t border-slate-700">
          {NavItems.map((item) => (
            <NavLink key={item.href} href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-indigo-400 transition duration-150"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}

          <hr className="border-slate-800 my-2" />

          {/* Mobile Auth Button/Profile */}
          {!user ? (
            <button
              onClick={() => handleSignIn('Google')}
              className="mt-4 flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-base font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition duration-200"
            >
              <LogIn className="w-5 h-5" />
              <span>Sign In / Register</span>
            </button>
          ) : (
            <>
              {/* Mobile Profile Card */}
              <div className="flex items-center space-x-3 px-3 py-3 bg-slate-800/50 rounded-lg">
                <div className="relative">
                  <User className="h-8 w-8 rounded-full bg-indigo-600 p-1 text-white" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border border-slate-900"></span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-white">{user.name}</span>
                  <span className="text-xs text-slate-400">{user.email}</span>
                </div>
              </div>
              {/* Mobile Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-base font-medium text-red-400 hover:bg-slate-800 transition duration-150"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// User Profile Dropdown Component for Desktop
function UserDropdown({ user, handleSignOut }: { user: { name: string; email: string }; handleSignOut: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-800 transition duration-150 focus:outline-none"
      >
        <div className="relative">
          {/* Placeholder for Profile Image */}
          <User className="h-8 w-8 rounded-full bg-indigo-600 p-1 text-white" />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-slate-900"></span>
        </div>
        {/* Shows user name on larger screens */}
        <span className="hidden lg:inline text-sm font-medium text-slate-200">{user.name}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          onMouseLeave={() => setIsOpen(false)}
          className="absolute right-0 mt-3 w-56 rounded-xl shadow-2xl bg-slate-700 ring-1 ring-black ring-opacity-5 z-50 transform transition-opacity duration-150 origin-top-right"
        >
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-white border-b border-slate-600">
              <p className="font-bold">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>

            <NavLink
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-slate-200 hover:bg-slate-600"
            >
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
        </div>
      )}
    </div>
  );
}
