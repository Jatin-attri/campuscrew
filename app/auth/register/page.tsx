// "use client"

// import Link from "next/link"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import { useToast } from "sonner"

// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// // Define the form schema for validation
// const formSchema = z
//   .object({
//     name: z.string().min(2, { message: "Name must be at least 2 characters." }),
//     email: z.string().email({ message: "Please enter a valid email." }),
//     password: z
//       .string()
//       .min(8, { message: "Password must be at least 8 characters." }),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"], // Point error to confirmPassword field
//   })

// export default function RegisterPage() {
//   const { toast } = useToast()

//   // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   })

//   // 2. Define a submit handler.
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // This is where you'll call your backend Express API
//     console.log("Form values:", values)

//     // Example of showing a toast on success
//     toast({
//       title: "Account Created!",
//       description: "You have been successfully registered.",
//     })
//     // On failure:
//     // toast({
//     //   title: "Uh oh! Something went wrong.",
//     //   description: "There was a problem with your request.",
//     //   variant: "destructive",
//     // })
//   }

//   return (
//     <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl">Create your Account</CardTitle>
//           <CardDescription>
//             Join CampusCrew to access all features.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Full Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="John Doe" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="email"
//                         placeholder="you@example.com"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="••••••••"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="confirmPassword"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Confirm Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="••••••••"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit" className="w-full">
//                 Create Account
//               </Button>
//             </form>
//           </Form>

//           <div className="mt-6 text-center text-sm">
//             Already have an account?{" "}
//             <Link href="/login" className="font-semibold text-primary hover:underline">
//               Log In
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
