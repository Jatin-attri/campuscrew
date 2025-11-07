import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Presentation,
  Send,
  Users,
  Lock,
  CheckCircle,
  ShieldCheck,
  Award,
} from "lucide-react"
import { CometCard } from "@/components/ui/comet-card";

export default function MarketplacePage() {
  return (
    <div className="container mx-auto py-10">
      {/* --- Hero Section --- */}
      <section className="flex flex-col items-center py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          The <span className="text-primary">CampusCrew</span> Marketplace
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Save time and get expert help from top-performing students. Post a
          request and let your fellow "Crewmates" handle the hard work.
        </p>
        <Button asChild size="lg" className="mt-8 text-lg">
          <Link href="/marketplace/new">Post a Request Now</Link>
        </Button>
      </section>

      {/* --- Service Showcase --- */}
      <section className="py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Get Help With...
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Assignment Card */}
          <CometCard>
          <Card className="flex flex-col justify-between transition-all hover:shadow-lg">
            <CardHeader className="flex-row items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Written Assignments</CardTitle>
                <CardDescription className="text-md">
                  Essays, reports, case studies, and more.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                Get well-researched, custom-written assignments delivered on
                time. Our providers follow your requirements to the letter.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full border-black">
                <Link href="/marketplace/new?service=assignment">
                  Request an Assignment
                </Link>
              </Button>
            </CardFooter>
          </Card></CometCard>

          {/* Presentation Card */}
          <CometCard>
          <Card className="flex flex-col justify-between transition-all hover:shadow-lg">
            <CardHeader className="flex-row items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-4">
                <Presentation className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Presentation Design</CardTitle>
                <CardDescription className="text-md">
                  Professional PowerPoints & Google Slides.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                Turn your complex ideas into a stunning, professional
                presentation. Perfect for final projects and seminars.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full border-black">
                <Link href="/marketplace/new?service=presentation">
                  Request a PPT
                </Link>
              </Button>
            </CardFooter>
          </Card></CometCard>
        </div>
      </section>

      <Separator className="my-16" />

      {/* --- How It Works Section --- */}
      <section className="py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
        <div className="grid items-start gap-8 md:grid-cols-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Send className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">1. Post Your Request</h3>
            <p className="text-muted-foreground">
              Fill out a simple form with your requirements, deadline, and
              budget.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">2. Get Bids</h3>
            <p className="text-muted-foreground">
              Vetted "Crewmates" (other students) bid on your task. You pick
              the best one.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Lock className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">3. Pay Securely</h3>
            <p className="text-muted-foreground">
              Your payment is held securely by CampusCrew until the work is
              delivered.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">4. Approve & Download</h3>
            <p className="text-muted-foreground">
              You get the completed work, and we release the payment to the
              provider.
            </p>
          </div>
        </div>
      </section>
      
      {/* --- Trust Badge Section --- */}
      <section className="bg-muted -mx-6 rounded-lg py-20 px-6">
        <div className="container mx-auto grid gap-8 md:grid-cols-3">
            <div className="flex items-center gap-4">
              <ShieldCheck className="h-10 w-10 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Secure Payments</h3>
                <p className="text-muted-foreground">Your payment is protected until you approve the final work.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Award className="h-10 w-10 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Vetted Providers</h3>
                <p className="text-muted-foreground">All providers are verified students from your community.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Lock className="h-10 w-10 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">100% Confidential</h3>
                <p className="text-muted-foreground">Your requests are private and your identity is protected.</p>
              </div>
            </div>
        </div>
      </section>

    </div>
  )
}