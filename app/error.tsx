"use client"

import { Button } from "@/components/ui/button"
import { Skull } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error()
  }, [error])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-8 p-4">
      <Skull className="h-64 w-64 opacity-20 rotate-12" />

      <h2 className="text-lg font-semibold">Something went wrong!</h2>

      <div className="flex items-center gap-x-4">
        <Button size={"lg"} asChild>
          <Link href={"/documents"}>Go back</Link>
        </Button>
        <Button size={"lg"} variant={"outline"} onClick={reset}>Try again</Button>
      </div>
    </div>
  )
}
