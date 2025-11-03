"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FileText,
  Download,
  ShoppingCart,
  Sparkles,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react"

// Import the mock data
import mockPapers from "@/app/data/mock-papers.json"

// Define the type for our paper data
type Paper = {
  id: string;
  title: string;
  subject: string;
  year: number;
  isSolved: boolean;
  price: number;
  fileUrl: string;
}

// --- Get unique values for filters ---
const subjects = [...new Set(mockPapers.map((paper) => paper.subject))].sort()
const years = [...new Set(mockPapers.map((paper) => paper.year))].sort((a, b) => a - b)

// --- Separate papers *before* component ---
const unsolvedPapers = mockPapers.filter(paper => !paper.isSolved)
const solvedPapers = mockPapers.filter(paper => paper.isSolved)

export default function PapersPage() {
  // --- State for Filters ---
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedYears, setSelectedYears] = useState<number[]>([])

  // --- Reset All Filters ---
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedSubject("all")
    setSelectedYears([])
  }

  // --- Filter Logic ---
  const filterPapers = (papers: Paper[]) => {
    return papers.filter((paper) => {
      const matchesSearch =
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.subject.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesSubject =
        selectedSubject === "all" || paper.subject === selectedSubject
      
      const matchesYear =
        selectedYears.length === 0 || selectedYears.includes(paper.year)

      return matchesSearch && matchesSubject && matchesYear
    })
  }

  // --- Create the final filtered lists ---
  const filteredUnsolved = filterPapers(unsolvedPapers)
  const filteredSolved = filterPapers(solvedPapers)

  return (
    <div className="container mx-auto py-10">
      {/* --- Page Header --- */}
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Previous Year Papers</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Use the filters to find exactly what you need from our library.
        </p>
      </section>

      {/* --- Main Content Grid (Sidebar + Tabs) --- */}
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
                placeholder="Search papers..."
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
                  onCheckedChange={() =>
                    setSelectedYears((prev) =>
                      prev.includes(year)
                        ? prev.filter((y) => y !== year)
                        : [...prev, year]
                    )
                  }
                />
                <Label htmlFor={`year-${year}`} className="font-normal">
                  {year}{year === 1 ? 'st' : year === 2 ? 'nd' : year === 3 ? 'rd' : 'th'} Year
                </Label>
              </div>
            ))}
          </div>
        </aside>

        {/* --- 2. Results Area (with Tabs) --- */}
        <main>
          <Tabs defaultValue="unsolved" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="unsolved" className="py-3">
                <FileText className="mr-2 h-5 w-5" />
                Unsolved ({filteredUnsolved.length})
              </TabsTrigger>
              <TabsTrigger value="solved" className="py-3">
                <Sparkles className="mr-2 h-5 w-5" />
                Solved ({filteredSolved.length})
              </TabsTrigger>
            </TabsList>

            {/* --- Unsolved Papers Content --- */}
            <TabsContent value="unsolved" className="mt-8">
              {filteredUnsolved.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredUnsolved.map((paper) => (
                    <PaperCard key={paper.id} paper={paper} />
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </TabsContent>

            {/* --- Solved Papers Content --- */}
            <TabsContent value="solved" className="mt-8">
              {filteredSolved.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredSolved.map((paper) => (
                    <PaperCard key={paper.id} paper={paper} />
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

// --- Reusable Paper Card Component (with effects) ---
function PaperCard({ paper }: { paper: Paper }) {
  return (
    <Card
      className={`flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1
      ${
        paper.isSolved
          ? "relative ring-2 ring-primary/50" // "Premium" glow effect
          : "border"
      }`}
    >
      {paper.isSolved && (
        <div className="absolute top-2 -right-11 z-10 rotate-45 bg-primary px-10 py-1 text-xs font-bold text-primary-foreground shadow-md">
          SOLVED
        </div>
      )}
      
      <CardHeader className="pt-6">
        <CardTitle className="text-lg">{paper.title}</CardTitle>
        <CardDescription>{paper.subject}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <Badge variant="outline">{paper.year} Year</Badge>
      </CardContent>
      
      <Separator />
      
      <CardFooter className="flex items-center justify-between p-4">
        <div className="text-lg font-bold">
          {paper.isSolved ? (
            <span className="text-primary">₹{paper.price}</span>
          ) : (
            <span className="text-green-600">Free</span>
          )}
        </div>
        {paper.isSolved ? (
          // --- Buy Button (for Solved) ---
          <Button asChild size="sm">
            <Link href={paper.fileUrl}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Buy Now
            </Link>
          </Button>
        ) : (
          // --- Download Button (for Unsolved) ---
          <Button asChild variant="outline" size="sm">
            <Link href={paper.fileUrl} download>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// --- Reusable Empty State Component ---
function EmptyState() {
  return (
    <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted">
      <h2 className="text-2xl font-semibold">No Papers Found</h2>
      <p className="mt-2 text-muted-foreground">
        Try adjusting your filters or check back later!
      </p>
    </div>
  )
}