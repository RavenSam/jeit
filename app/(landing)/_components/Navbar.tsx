"use client"

import Logo from "./Logo"
import { cn } from "@/lib/utils"
import { useScrollTop } from "@/hooks/use-scroll-top"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useConvexAuth } from "convex/react"
import { SignInButton, UserButton } from "@clerk/clerk-react"
import Spinner from "@/components/spinner"

export default function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth()
  const scrolled = useScrollTop()

  return (
    <div
      className={cn(
        "fixed top-0 flex items-center w-full p-4 z-50 md:px-6",
        scrolled && "border-b bg-background shadow-sm"
      )}
    >
      <Logo />

      <div className="ml-auto justify-end w-full flex items-center gap-x-2">
        {isLoading && <Spinner className="mx-4" />}

        {!isAuthenticated && !isLoading && (
          <SignInButton mode="modal">
            <Button variant={"ghost"} className="font-semibold tracking-widest">
              Login
            </Button>
          </SignInButton>
        )}

        {isAuthenticated && !isLoading && <UserButton afterSignOutUrl="/" />}

        <ModeToggle />
      </div>
    </div>
  )
}
