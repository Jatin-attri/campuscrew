'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">EduHub</Link>
      <div className="space-x-4">
        <Link href="/resources/notes">Notes</Link>
        <Link href="/resources/papers">Papers</Link>
        <Link href="/marketplace">Marketplace</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/auth/login">Login</Link>
      </div>
    </nav>
  );
}
