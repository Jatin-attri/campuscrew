"use client"
import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation" // Use next/navigation in App Router
import { useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// --- Mock Data (Replace with your API data later) ---
const mockStudentRequests = [
  { id: "REQ-001", topic: "Java Spring Boot API", status: "In Progress" },
  { id: "REQ-002", topic: "React State Management", status: "Completed" },
  { id: "REQ-003", topic: "Python Data Analysis", status: "Pending" },
]

const mockProviderJobs = [
  { id: "JOB-001", topic: "Urgent Python Script", budget: "$50" },
  { id: "JOB-002", topic: "React Component Library", budget: "$200" },
]
// --- End Mock Data ---


export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // This effect handles authentication status
  useEffect(() => {
    if (status === "loading") {
      return // Don't do anything while loading
    }
    if (status === "unauthenticated") {
      router.push("/login") // Redirect to login if not authenticated
    }
  }, [status, router])

  // --- 1. Loading State ---
  // Show a skeleton UI while session is being fetched
  if (status === "loading") {
    return <DashboardLoadingSkeleton />
  }

  // --- 2. Authenticated State ---
  // We assume the user is authenticated if we reach this point

  // TODO: Get user role from your database and pass it to the session
  // For now, we'll mock a role. Change "student" to "provider" to see the other tab.
  const userRole = (session?.user as any)?.role || "student" // MOCK: "student" | "provider" | "admin"

  return (
    <SessionProvider>
      <div className="container mx-auto py-10">
        <div className="mb-6 flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback>
              {session?.user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">
              Welcome, {session?.user?.name}!
            </h1>
            <p className="text-lg text-muted-foreground">
              Here's your overview as a {userRole}.
            </p>
          </div>
        </div>

        {/* --- Main Dashboard Content --- */}
        <Tabs defaultValue={userRole === "student" ? "my-requests" : "available-jobs"}>
          <TabsList>
            {/* Show different tabs based on role */}
            {userRole === "student" && (
              <>
                <TabsTrigger value="my-requests">My Requests</TabsTrigger>
                <TabsTrigger value="my-files">My Files</TabsTrigger>
              </>
            )}
            {userRole === "provider" && (
              <>
                <TabsTrigger value="available-jobs">Available Jobs</TabsTrigger>
                <TabsTrigger value="my-services">My Services</TabsTrigger>
              </>
            )}
            {userRole === "admin" && (
              <>
                <TabsTrigger value="manage-users">Manage Users</TabsTrigger>
                <TabsTrigger value="manage-content">Manage Content</TabsTrigger>
              </>
            )}
          </TabsList>

          {/* --- Student Tabs --- */}
          <TabsContent value="my-requests" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>My Assignment Requests</CardTitle>
                  <CardDescription>
                    Track the status of all your requests.
                  </CardDescription>
                </div>
                <Button>Post a New Request</Button>
              </CardHeader>
              <CardContent>
                <DataTable data={mockStudentRequests} type="student" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="my-files">
            <Card>
              <CardHeader>
                <CardTitle>My Files</CardTitle>
                <CardDescription>
                  Your uploaded and purchased files.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>You haven't uploaded or purchased any files yet.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- Provider Tabs --- */}
          <TabsContent value="available-jobs" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Jobs</CardTitle>
                <CardDescription>
                  Browse and accept jobs from other students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable data={mockProviderJobs} type="provider" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="my-services">
            <Card>
              <CardHeader>
                <CardTitle>My Services</CardTitle>
                <CardDescription>
                  Manage the services you offer.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>You haven't listed any services yet.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- Admin Tabs --- */}
          <TabsContent value="manage-users">
            <Card>
              <CardHeader>
                <CardTitle>Manage Users</CardTitle>
                <CardDescription>Approve or remove users.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Admin user management table goes here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="manage-content">
            <Card>
              <CardHeader>
                <CardTitle>Manage Content</CardTitle>
                <CardDescription>
                  Approve new papers, notes, and services.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Admin content management table goes here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SessionProvider>
  )
}

// --- Reusable Data Table Component ---
function DataTable({ data, type }: { data: any[]; type: "student" | "provider" }) {
  const headers = type === "student"
    ? ["Request ID", "Topic", "Status", "Actions"]
    : ["Job ID", "Topic", "Budget", "Actions"]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.topic}</TableCell>
            <TableCell>
              {type === "student" ? (
                <Badge variant={item.status === "Completed" ? "default" : "secondary"}>
                  {item.status}
                </Badge>
              ) : (
                item.budget
              )}
            </TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

// --- Reusable Loading Skeleton Component ---
function DashboardLoadingSkeleton() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
      <Skeleton className="h-10 w-64" /> {/* TabsList Skeleton */}
      <Card className="mt-4">
        <CardHeader>
          <Skeleton className="h-7 w-1/3" />
          <Skeleton className="h-5 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}
