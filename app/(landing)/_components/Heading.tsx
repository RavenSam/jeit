"use client"

import Spinner from "@/components/spinner"
import { Button } from "@/components/ui/button"
import { useConvexAuth } from "convex/react"
import { ChevronRight, LogIn } from "lucide-react"
import Link from "next/link"
import { SignInButton } from "@clerk/clerk-react"

export default function Heading() {
  const { isAuthenticated, isLoading } = useConvexAuth()

  return (
    <div className="max-w-3xl space-y-4 md:space-y-8">
      <div className="">
        <div className="absolute top-0 left-5 w-80 h-80 rounded-full bg-purple-500/40 filter blur-3xl -z-10 dark:opacity-40" />
        <div className="absolute top-1/3 right-20 w-60 h-60 rounded-full bg-pink-500/50 filter blur-3xl -z-10 dark:opacity-40" />
        <div className="absolute bottom-10 right-1/2 w-60 h-60 rounded-full bg-blue-500/50 filter blur-3xl -z-10 dark:opacity-40" />
      </div>

      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans, Unified. <br />
        Welcome to <span className="italic">Plume.</span>
      </h1>

      <h2 className="text-base sm:text-xl md:text-2xl font-medium text-muted-foreground">
        Plume is the connected workplace where <br /> better, faster work
        happens.
      </h2>

      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}

      {isAuthenticated && !isLoading && (
        <Button className="font-semibold tracking-widest" asChild>
          <Link href={"/documents"}>
            Documents
            <ChevronRight className="h-5 w-5 ml-2" />
          </Link>
        </Button>
      )}

      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button size={"lg"} className="font-bold tracking-widest">
            Get in
            <LogIn className="h-5 w-5 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  )
}
