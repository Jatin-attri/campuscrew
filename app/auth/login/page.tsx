"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { signIn } from "next-auth/react"
import { toast } from "sonner" // <-- CORRECTED IMPORT

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Define the form schema for validation
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
})

export default function LoginPage() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler for email/password.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // This is where you'll call your backend Express API
    // OR use NextAuth's "credentials" provider
    console.log("Form values:", values)

    // Example of using NextAuth credentials
    const result = await signIn("credentials", {
      redirect: false, // Don't redirect, handle success/error here
      email: values.email,
      password: values.password,
    })

    if (result?.error) {
      toast.error("Login Failed", { // <-- Use sonner
        description: "Invalid email or password.",
      })
    } else if (result?.ok) {
      toast.success("Login Successful!", { // <-- Use sonner
        description: "Redirecting to your dashboard...",
      })
      // NextAuth will automatically redirect, or you can push()
      // window.location.href = "/dashboard";
    }
  }

  // 3. Define handlers for OAuth providers
  const handleOAuthSignIn = (provider: "google" | "linkedin") => {
    signIn(provider, { callbackUrl: "/dashboard" }) // Redirect to dashboard on success
  }

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
          <CardDescription>
            Sign in to your CampusCrew account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => handleOAuthSignIn("google")}
            >
              {/* Add Google icon here if you like */}
              Sign in with Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleOAuthSignIn("linkedin")}
            >
              {/* Add LinkedIn icon here */}
              Sign in with LinkedIn
            </Button>
          </div>

          <Separator className="my-6">
            <span className="bg-background px-2 text-xs text-muted-foreground">
              OR CONTINUE WITH
            </span>
          </Separator>

          {/* Email/Password Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/register" className="font-semibold text-primary hover:underline">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

