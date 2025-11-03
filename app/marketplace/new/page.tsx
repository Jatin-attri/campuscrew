"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { toast } from "sonner"
import {
  CalendarIcon,
  UploadCloud,
  File as FileIcon,
  X,
  ArrowRight,
  FileText,
  Presentation,
  CheckCircle,
  Circle,
  Loader2,
} from "lucide-react"

import { cn } from "@/lib/utils"
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"

// Form schema (Deadline & Budget are now optional until we move to payment)
const requestSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters.")
    .max(100, "Title must be 100 characters or less."),
  subject: z.string().min(2, "Subject is required."),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters.")
    .max(1500, "Description must be 1500 characters or less."),
  deadline: z.date({
    required_error: "A deadline is required.",
  }),
  budget: z.coerce
    .number({ required_error: "Please enter your budget." })
    .min(1, "Budget must be at least ₹1."),
})

// --- Wrapper to use Suspense for useSearchParams ---
function NewRequestPageContent() {
  const searchParams = useSearchParams()
  const defaultService = searchParams.get("service") as "assignment" | "presentation" | null
  
  // State to manage the UI flow
  const [service, setService] = useState<"assignment" | "presentation" | null>(defaultService)
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof requestSchema>>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      title: "",
      subject: "",
      description: "",
      deadline: undefined,
      budget: 1,
    },
  })

  // --- File Handling ---
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

  // --- Form Submit Handler ---
  async function onSubmit(values: z.infer<typeof requestSchema>) {
    if (!service) {
      toast.error("Please select a service type first.")
      return
    }
    
    setIsSubmitting(true)
    
    // --- TODO: Handle payment flow ---
    // 1. Create FormData
    const formData = new FormData()
    if (file) {
      formData.append("file", file)
    }
    formData.append("service", service)
    formData.append("title", values.title)
    formData.append("subject", values.subject)
    formData.append("description", values.description)
    formData.append("deadline", values.deadline.toISOString())
    formData.append("budget", String(values.budget))
    
    // 2. Send to backend to create a request & get payment link
    // const response = await fetch("/api/marketplace/create", {
    //   method: "POST",
    //   body: formData,
    // })
    // const data = await response.json()

    // 3. For now, we'll just simulate success
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log("Form values:", values)
    console.log("Service:", service)
    console.log("File:", file)
    
    setIsSubmitting(false)
    toast.success("Request Submitted!", {
      description: "Redirecting to payment...",
    })
    
    // 4. Redirect to payment page
    // router.push(data.paymentUrl)
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="space-y-10">
        
        {/* --- STEP 1: CHOOSE SERVICE --- */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Step 1: Choose Your Service</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ServiceSelectionCard
              title="Written Assignment"
              description="Essays, reports, case studies, etc."
              icon={<FileText className="h-8 w-8" />}
              isSelected={service === "assignment"}
              onClick={() => setService("assignment")}
            />
            <ServiceSelectionCard
              title="Presentation Design"
              description="Professional PPTs & Google Slides."
              icon={<Presentation className="h-8 w-8" />}
              isSelected={service === "presentation"}
              onClick={() => setService("presentation")}
            />
          </div>
        </div>

        {/* --- FORM FADES IN ONCE SERVICE IS_SELECTED --- */}
        {service && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              
              {/* --- STEP 2: DETAILS --- */}
              <Card className="animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <CardHeader>
                  <CardTitle>Step 2: Tell Us What You Need</CardTitle>
                  <CardDescription>
                    Provide all the details for your{" "}
                    <span className="font-semibold text-primary">
                      {service === "assignment"
                        ? "Assignment"
                        : "Presentation"}
                    </span>
                    .
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Title & Subject */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Request Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="E.g., 'Java OOP Project Report'"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="E.g., 'Computer Science'"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detailed Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Be specific! Mention topics, page count, formatting, etc. (min 50 chars)"
                            rows={6}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* File Upload */}
                  <FormItem>
                    <FormLabel>Attach Files (Optional)</FormLabel>
                    <FormDescription>
                      Upload rubrics, templates, or drafts.
                    </FormDescription>
                    <FormControl>
                      <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={cn(
                          "relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 p-10 text-center transition-colors",
                          isDragging ? "bg-muted" : "bg-transparent",
                          file && "border-primary bg-primary/5"
                        )}
                      >
                        {!file ? (
                          <>
                            <UploadCloud className="mb-4 h-12 w-12 text-muted-foreground" />
                            <p className="font-semibold text-muted-foreground">
                              Drag & drop files here, or click to browse
                            </p>
                            <Input
                              type="file"
                              className="absolute h-full w-full opacity-0"
                              onChange={handleFileChange}
                            />
                          </>
                        ) : (
                          <div className="relative">
                            <FileIcon className="h-12 w-12 text-primary" />
                            <p className="mt-2 font-semibold">{file.name}</p>
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
                  </FormItem>
                </CardContent>
              </Card>

              {/* --- STEP 3: TERMS --- */}
              <Card className="animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
                <CardHeader>
                  <CardTitle>Step 3: Set Your Terms</CardTitle>
                  <CardDescription>
                    Set your deadline and the maximum budget you're willing
                    to pay.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Deadline</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Budget (in ₹)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="E.g., 500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* --- STEP 4: SUBMIT --- */}
              <Card className="animate-in fade-in-50 slide-in-from-bottom-5 duration-1000">
                <CardHeader>
                  <CardTitle>Step 4: Review & Pay</CardTitle>
                  <CardDescription>
                    Review your request. You will be redirected to our
                    secure payment gateway to post this job.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-4">
                  <div className="text-sm text-muted-foreground">
                    Your payment is held securely by CampusCrew and is only
                    released to the provider after you approve the final
                    work.
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <ArrowRight className="mr-2 h-5 w-5" />
                    )}
_                    {isSubmitting
                      ? "Submitting..."
                      : `Proceed to Pay (₹${form.watch("budget") || 0})`}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        )}
      </div>
    </div>
  )
}

// --- Wrapper Component to use Suspense ---
export default function NewRequestPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <NewRequestPageContent />
    </Suspense>
  )
}

// --- Helper Component for Service Selection ---
function ServiceSelectionCard({
  title,
  description,
  icon,
  isSelected,
  onClick,
}: {
  title: string
  description: string
  icon: React.ReactNode
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer transition-all duration-300",
        isSelected
          ? "ring-2 ring-primary"
          : "ring-1 ring-border hover:shadow-md"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-primary/10 p-3 text-primary">
            {icon}
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
        {isSelected ? (
          <CheckCircle className="h-6 w-6 text-primary" />
        ) : (
          <Circle className="h-6 w-6 text-muted-foreground/50" />
        )}
      </CardHeader>
    </Card>
  )
}

// --- Helper Component for Suspense Fallback ---
function PageLoader() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
       <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Step 1: Choose Your Service</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card><CardHeader><div className="h-16 w-full animate-pulse bg-muted"></div></CardHeader></Card>
            <Card><CardHeader><div className="h-16 w-full animate-pulse bg-muted"></div></CardHeader></Card>
          </div>
        </div>
    </div>
  )
}