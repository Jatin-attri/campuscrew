"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import {
  Download,
  FileText,
  DollarSign,
  Briefcase,
  PlusCircle,
  Bell,
  Settings,
  Star,
} from "lucide-react"

// --- Mock Data ---
// In a real app, you'd fetch this data from your API
const statsData = [
  {
    title: "Downloads",
    value: "12",
    icon: <Download className="h-4 w-4 text-muted-foreground" />,
    description: "Papers & notes you've downloaded",
  },
  {
    title: "Requests Posted",
    value: "3",
    icon: <FileText className="h-4 w-4 text-muted-foreground" />,
    description: "Jobs you've posted in the marketplace",
  },
  {
    title: "Gigs Completed",
    value: "2",
    icon: <Briefcase className="h-4 w-4 text-muted-foreground" />,
    description: "Jobs you've completed as a provider",
  },
  {
    title: "Total Earnings",
    value: "₹1,200",
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    description: "From your completed gigs",
  },
]

const myRequests = [
  {
    id: "REQ-001",
    title: "Java OOP Project Report",
    status: "In Progress",
    provider: "Priya S.",
    dueDate: "Nov 10, 2025",
  },
  {
    id: "REQ-002",
    title: "Calculus II Problem Set",
    status: "Pending Bids",
    provider: "N/A",
    dueDate: "Nov 15, 2025",
  },
  {
    id: "REQ-003",
    title: "Marketing PPT Design",
    status: "Completed",
    provider: "Rohan G.",
    dueDate: "Nov 01, 2025",
  },
]

const myGigs = [
  {
    id: "GIG-001",
    title: "Data Structures Assignment",
    status: "Completed",
    client: "Aisha K.",
    dueDate: "Oct 28, 2025",
  },
  {
    id: "GIG-002",
    title: "Web Dev Final Project Help",
    status: "Awaiting Approval",
    client: "Mikey C.",
    dueDate: "Nov 03, 2025",
  },
]

const recentActivity = [
  {
    id: "ACT-001",
    icon: <Star className="h-4 w-4 text-yellow-500" />,
    text: "You received a 5-star review from Aisha K.",
    time: "2h ago",
  },
  {
    id: "ACT-002",
    icon: <DollarSign className="h-4 w-4 text-green-500" />,
    text: "Rohan G. submitted 'Marketing PPT Design'.",
    time: "1d ago",
  },
  {
    id: "ACT-003",
    icon: <FileText className="h-4 w-4 text-primary" />,
    text: "New papers for 'Data Structures' were added.",
    time: "2d ago",
  },
]
// --- End Mock Data ---

// --- Helper to get status badge variant ---
const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "in progress":
    case "awaiting approval":
      return "secondary"
    case "pending bids":
      return "outline"
    case "completed":
      return "default"
    default:
      return "default"
  }
}

// IMPORTANT: This file relies on 'next-auth', 'next/navigation', and 'next/link'.
// If you see errors like "Could not resolve", please ensure these packages
// are installed in your project by running: npm install
export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // --- 1. Security & Loading State ---
  // if (status === "loading") {
  //   return <DashboardLoadingSkeleton />
  // }

  // if (status === "unauthenticated") {
  //   router.push("/login")
  //   return null // Render nothing while redirecting
  // }
    if (status === "loading") return <p>Loading...</p>
  if (status === "unauthenticated") {
    router.push("/auth/login")
    return null
  }

  // --- 2. Main Dashboard Render ---
  return (
    <div className="container mx-auto py-10">
      {/* --- Page Header --- */}
      <div className="mb-8 space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session?.user?.name?.split(" ")[0] || "Student"}!
        </h1>
        <p className="text-muted-foreground">
          Here's your CampusCrew update for Wednesday, November 5, 2025.
        </p>
      </div>

      {/* --- Main Grid Layout --- */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* --- Top Stat Cards (Span full width on mobile) --- */}
        {statsData.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}

        {/* --- Main Content Area (2/3 width on desktop) --- */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="myRequests" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="myRequests">
                My Marketplace Requests
              </TabsTrigger>
              <TabsTrigger value="myGigs">My Provider Gigs</TabsTrigger>
            </TabsList>

            {/* My Requests Tab */}
            <TabsContent value="myRequests" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Requests</CardTitle>
                  <CardDescription>
                    Jobs you have posted in the marketplace.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Due Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {myRequests.map((req) => (
                        <TableRow key={req.id}>
                          <TableCell className="font-medium">{req.title}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(req.status)}>
                              {req.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{req.provider}</TableCell>
                          <TableCell>{req.dueDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Gigs Tab */}
            <TabsContent value="myGigs" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Gigs</CardTitle>
                  <CardDescription>
                    Jobs you are currently working on as a provider.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Due Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {myGigs.map((gig) => (
                        <TableRow key={gig.id}>
                          <TableCell className="font-medium">{gig.title}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(gig.status)}>
                              {gig.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{gig.client}</TableCell>
                          <TableCell>{gig.dueDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* --- Sidebar (1/3 width on desktop) --- */}
        <aside className="space-y-6 lg:col-span-1">
          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild size="lg" className="w-full">
                <Link href="/marketplace/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Post a New Request
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/papers">
                  <Download className="mr-2 h-4 w-4" />
                  Browse Papers
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity Card */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={activity.id}>
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback>{activity.icon}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  {index < recentActivity.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}

// --- Reusable Loading Skeleton Component ---
function DashboardLoadingSkeleton() {
  return (
    <div className="container mx-auto py-10">
      {/* Header Skeleton */}
      <div className="mb-8 space-y-2">
        <Skeleton className="h-9 w-1/3" />
        <Skeleton className="h-5 w-1/2" />
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Stats Skeletons */}
        <Skeleton className="h-[120px] w-full" />
        <Skeleton className="h-[120px] w-full" />
        <Skeleton className="h-[120px] w-full" />
        <Skeleton className="h-[120px] w-full" />

        {/* Main Content Skeleton */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-1/K" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Skeleton */}
        <aside className="space-y-6 lg:col-span-1">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
        </aside>
      </div>
    </div>
  )
}