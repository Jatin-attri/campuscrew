// app/layout.tsx
"use client";
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      
      <body>
    <SessionProvider>
        <Navbar />
        <main className="min-h-screen p-4">{children}</main></SessionProvider>
        
        <Footer />
      </body>
    </html>
  );
}
