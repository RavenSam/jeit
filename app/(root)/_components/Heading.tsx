import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Heading() {
  return (
    <div className="max-w-3xl space-y-4 md:space-y-8">
      <div className="hidden md:block">
        <div className="absolute top-0 left-5 w-80 h-80 rounded-full bg-purple-500/40 filter blur-3xl -z-10" />
        <div className="absolute top-1/3 right-20 w-60 h-60 rounded-full bg-pink-500/50 filter blur-3xl -z-10" />
        <div className="absolute bottom-10 right-1/2 w-60 h-60 rounded-full bg-blue-500/50 filter blur-3xl -z-10" />
      </div>

      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans, Unified. Welcome to{" "}
        <span className="italic">Plume.</span>
      </h1>

      <h2 className="text-base sm:text-xl md:text-2xl font-medium text-muted-foreground">
        Plume is the connected workplace where <br /> better, faster work
        happens.
      </h2>

      <Button size="lg" className="text-lg">
        Enter
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  )
}
