"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, Search, FileText, SlidersHorizontal, X } from "lucide-react"

// Import the new mock data
import mockNotes from "@/app/data/mock-notes.json"

// Define the type for our note data
type Note = {
  id: string;
  title: string;
  description: string;
  subject: string;
  year: number;
  uploader: string;
  uploaderAvatar: string;
  fileUrl: string;
}

// --- Get unique values for filters ---
// We use Set to automatically get unique values, then spread into an array
const subjects = [...new Set(mockNotes.map((note) => note.subject))].sort()
const years = [...new Set(mockNotes.map((note) => note.year))].sort((a, b) => a - b)

export default function NotesPage() {
  // --- State for Filters ---
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedYears, setSelectedYears] = useState<number[]>([])

  // --- Filter Logic ---
  const filteredNotes = mockNotes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesSubject =
      selectedSubject === "all" || note.subject === selectedSubject
    
    const matchesYear =
      selectedYears.length === 0 || selectedYears.includes(note.year)

    return matchesSearch && matchesSubject && matchesYear
  })

  // --- Handle Year Checkbox Change ---
  const handleYearChange = (year: number) => {
    setSelectedYears((prevYears) =>
      prevYears.includes(year)
        ? prevYears.filter((y) => y !== year) // Uncheck it
        : [...prevYears, year] // Check it
    )
  }

  // --- Reset All Filters ---
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedSubject("all")
    setSelectedYears([])
  }

  return (
    <div className="container mx-auto py-10">
      {/* --- Page Header --- */}
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Study Notes Hub</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your central hub for handwritten notes, summaries, and guides from
          top students.
        </p>
      </section>

      {/* --- Main Content Grid (Sidebar + Results) --- */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[280px_1fr]">
        
        {/* --- 1. Filter Sidebar --- */}
        <aside className="top-24 h-fit rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              <SlidersHorizontal className="mr-2 inline-block h-5 w-5" />
              Filters
            </h3>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <X className="mr-1 h-4 w-4" /> Reset
            </Button>
          </div>

          {/* Search Filter */}
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search notes..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Separator className="my-6" />

          {/* Subject Filter */}
          <div className="space-y-4">
            <Label className="text-md font-semibold">Subject</Label>
            <RadioGroup
              value={selectedSubject}
              onValueChange={setSelectedSubject}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="sub-all" />
                <Label htmlFor="sub-all" className="font-normal">All Subjects</Label>
              </div>
              {subjects.map((subject) => (
                <div key={subject} className="flex items-center space-x-2">
                  <RadioGroupItem value={subject} id={`sub-${subject}`} />
                  <Label htmlFor={`sub-${subject}`} className="font-normal">{subject}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator className="my-6" />

          {/* Year Filter */}
          <div className="space-y-4">
            <Label className="text-md font-semibold">Year</Label>
            {years.map((year) => (
              <div key={year} className="flex items-center space-x-2">
                <Checkbox
                  id={`year-${year}`}
                  checked={selectedYears.includes(year)}
                  onCheckedChange={() => handleYearChange(year)}
                />
                <Label htmlFor={`year-${year}`} className="font-normal">
                  {year}{year === 1 ? 'st' : year === 2 ? 'nd' : year === 3 ? 'rd' : 'th'} Year
                </Label>
              </div>
            ))}
          </div>
        </aside>

        {/* --- 2. Results Grid --- */}
        <main>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {filteredNotes.length} {filteredNotes.length === 1 ? "Note" : "Notes"} Found
            </h2>
          </div>

          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </main>
      </div>
    </div>
  )
}

// --- Reusable Note Card Component (with effects) ---
function NoteCard({ note }: { note: Note }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex-1 space-y-1">
          <CardTitle className="text-lg">{note.title}</CardTitle>
        </div>
        <div className="flex-shrink-0 rounded-lg bg-primary/10 p-3">
          <FileText className="h-6 w-6 text-primary" />
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {note.description}
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{note.subject}</Badge>
          <Badge variant="outline">{note.year} Year</Badge>
        </div>
      </CardContent>
      
      <Separator />
      
      <CardFooter className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={note.uploaderAvatar} alt={note.uploader} />
            <AvatarFallback>
              {note.uploader.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{note.uploader}</span>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href={note.fileUrl}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

// --- Reusable Empty State Component ---
function EmptyState() {
  return (
    <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted">
      <h2 className="text-2xl font-semibold">No Notes Found</h2>
      <p className="mt-2 text-muted-foreground">
        Try adjusting your filters or check back later!
      </p>
    </div>
  )
}