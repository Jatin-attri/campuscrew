"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { UploadCloud, File as FileIcon, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// Define the form schema
const uploadSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  subject: z.string().min(2, "Subject is required."),
  year: z.coerce.number().min(2000, "Year must be 2000 or later.").max(new Date().getFullYear()),
  type: z.enum(["paper", "notes"], { required_error: "You must select a type." }),
  description: z.string().optional(),
})

export default function UploadPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // --- 1. Authentication and Authorization ---
  // TODO: Update your NextAuth session callback to include the user's role
  const userRole = session?.user?.role || "student" // MOCK: "admin"

  if (status === "loading") {
    return <UploadLoadingSkeleton />
  }

  if (status === "unauthenticated" || userRole !== "admin") {
    // You can redirect, or just show an unauthorized message
    // router.push("/login")
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-3xl font-bold text-destructive">Access Denied</h1>
        <p className="text-lg text-muted-foreground">
          You do not have permission to view this page.
        </p>
      </div>
    )
  }

  // --- 2. Form Definition ---
  const form = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: "",
      subject: "",
      year: new Date().getFullYear(),
      type: undefined,
      description: "",
    },
  })

  // --- 3. File Handling ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  // --- 4. Submit Handler ---
  function onSubmit(values: z.infer<typeof uploadSchema>) {
    if (!file) {
      toast.error("No File Selected", {
        description: "Please select a file to upload.",
      })
      return
    }

    // This is where you'll upload to your backend (Multer, S3, etc.)
    console.log("Form values:", values)
    console.log("File:", file)

    // Example: Create FormData to send
    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", values.title)
    formData.append("subject", values.subject)
    formData.append("year", String(values.year))
    formData.append("type", values.type)
    formData.append("description", values.description || "")

    // --- TODO: Send formData to your backend API ---
    // e.g., await fetch("/api/upload", { method: "POST", body: formData })

    toast.success("Upload Successful!", {
      description: `${file.name} has been uploaded.`,
    })
    form.reset()
    setFile(null)
  }

  return (
    <div className="container mx-auto max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Upload Content</CardTitle>
          <CardDescription>
            Upload new Question Papers or Notes to the CampusCrew database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* --- File Dropzone --- */}
              <FormField
                control={form.control}
                name="file" // This is a virtual field for the dropzone
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 p-10 text-center transition-colors ${
                          isDragging ? "bg-muted" : "bg-transparent"
                        }`}
                      >
                        {!file ? (
                          <>
                            <UploadCloud className="mb-4 h-12 w-12 text-muted-foreground" />
                            <p className="font-semibold text-muted-foreground">
                              Drag & drop a file here, or click to browse
                            </p>
                            <p className="text-sm text-muted-foreground/80">
                              PDF, DOCX, ZIP (Max 10MB)
                            </p>
                            <Input
                              type="file"
                              className="absolute h-full w-full opacity-0"
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx,.zip"
                            />
                          </>
                        ) : (
                          <div className="relative">
                            <FileIcon className="h-12 w-12 text-primary" />
                            <p className="mt-2 font-semibold">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </p>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute -top-4 -right-8"
                              onClick={() => setFile(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* --- Content Type and Title --- */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a content type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="paper">Question Paper</SelectItem>
                          <SelectItem value="notes">Study Notes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., Mid-Term Exam"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* --- Subject and Year --- */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., Data Structures"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* --- Description --- */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Optional: Add any relevant details..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" className="w-full md:w-auto">
                Upload Content
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

// --- Reusable Loading Skeleton Component ---
function UploadLoadingSkeleton() {
  return (
    <div className="container mx-auto max-w-3xl py-10">
      <Card>
        <CardHeader>
          <Skeleton className="h-9 w-1/2" />
          <Skeleton className="h-5 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-8">
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-32" />
        </CardContent>
      </Card>
    </div>
  )
}
