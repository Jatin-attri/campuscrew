import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Import icons from lucide-react
import {
  BookMarked,
  ShoppingBag,
  BellRing,
  Search,
  Users,
  BadgeDollarSign,
  Quote,
  Download,
  IndianRupee,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto">
      {/* --- Hero Section --- */}
      <section className="flex flex-col items-center py-20 text-center md:py-32">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Welcome to <span className="text-primary">CampusCrew</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Your one-stop platform for question papers, notes, and peer-to-peer
          academic services.
        </p>
        <div className="mt-8 flex gap-4">
          <Button asChild size="lg">
            <Link href="/resources/papers">Browse Papers</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/marketplace">Visit Marketplace</Link>
          </Button>
        </div>
      </section>

      {/* --- Core Features Section --- */}
      <section className="py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Core Features
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Feature 1: Content Hub */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <BookMarked className="h-10 w-10 text-primary" />
                <CardTitle className="text-2xl">Content Hub</CardTitle>
              </div>
              <CardDescription className="pt-2">
                Access a vast library of question papers, solutions, and
                curated study notes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/resources/papers">Explore Hub</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Feature 2: Marketplace */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <ShoppingBag className="h-10 w-10 text-primary" />
                <CardTitle className="text-2xl">Marketplace</CardTitle>
              </div>
              <CardDescription className="pt-2">
                Offer your skills or find help for assignments,
                presentations, and projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/marketplace">Browse Services</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Feature 3: Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <BellRing className="h-10 w-10 text-primary" />
                <CardTitle className="text-2xl">Notifications</CardTitle>
              </div>
              <CardDescription className="pt-2">
                Get instant updates on exam dates, assignment deadlines, and
                new content uploads.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/notifications">View Updates</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- How It Works Section --- */}
      <section className="bg-muted -mx-6 rounded-lg py-20 px-6">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold">
            How It Works
          </h2>
          <div className="grid items-start gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">1. Find Resources</h3>
              <p className="text-muted-foreground">
                Search our extensive database for past papers, notes, or find a
                skilled student in the marketplace.
              </p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {/*  */}
                <Download className="h-8 w-8"></Download>

              </div>
              <h3 className="mb-2 text-xl font-bold">Download or Connect</h3>
              {/* Line 135 */}
              <p className="text-muted-foreground">
                Download notes directly or connect with another student to get
                help with your specific assignment.
              </p>
            </div> {/* This closes the Step 2 div */}


            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {/*  */}
                <IndianRupee className="h-8 w-8"></IndianRupee>
              </div>
              {/* ... code after ... */}
              <h3 className="mb-2 text-xl font-semibold">3. Pay Securely</h3>
              <p className="text-muted-foreground">
                For marketplace services, pay securely through our platform.
                Payment is held until you approve the work.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* --- Testimonials Section --- */}
      <section className="py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">
          What Students Are Saying
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="flex flex-col">
            <CardContent className="flex-grow pt-6">
              <Quote className="mb-4 h-8 w-8 text-primary" />
              <p className="italic text-muted-foreground">
                "CampusCrew was a lifesaver during my final exams. I found all
                the previous year's papers in one place. Highly recommend!"
              </p>
            </CardContent>
            <CardHeader className="flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                <AvatarFallback>S1</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">Jatin Attri</CardTitle>
                <CardDescription>MCA, 1st Year</CardDescription>
              </div>
            </CardHeader>
          </Card>

          <Card className="flex flex-col">
            <CardContent className="flex-grow pt-6">
              <Quote className="mb-4 h-8 w-8 text-primary" />
              <p className="italic text-muted-foreground">
                "I used the marketplace to get help with my final year
                project presentation. The provider was amazing and I got an A!"
              </p>

            </CardContent>
            <CardHeader className="flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/someotheruser.png" alt="Avatar" />
                <AvatarFallback>R2</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">Rohan Gupta</CardTitle>
                <CardDescription>MCA, 2nd Year</CardDescription>
              </div>
            </CardHeader>
          </Card>

          <Card className="flex flex-col">
            <CardContent className="flex-grow pt-6">
              <Quote className="mb-4 h-8 w-8 text-primary" />
              <p className="italic text-muted-foreground">
                "Just being able to offer my presentation design skills here
                has helped me earn good pocket money. It's a win-win."
              </p>
            </CardContent>
            <CardHeader className="flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/anotheruser.png" alt="Avatar" />
                <AvatarFallback>A3</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">Sahil Sharma</CardTitle>
                <CardDescription>BBA, 2nd Year</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="flex flex-col items-center rounded-lg bg-primary py-20 text-center text-primary-foreground">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="mt-2 text-lg text-primary-foreground/80">
          Create an account today to access all features.
        </p> {/* <-- Fixed line! */}
        <Button asChild variant="secondary" size="lg" className="mt-8">
          <Link href="/auth/register">Sign Up for Free</Link>
        </Button>
      </section>
    </div>
  );
}