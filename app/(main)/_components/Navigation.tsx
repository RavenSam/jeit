import { Button } from "@/components/ui/button"
import { ChevronsLeft } from "lucide-react"

export default function Navigation() {
  return (
    <>
      <aside className="group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[9999]">
        <div className="">
          <p>Action items</p>
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>

        <Button
          variant={"link"}
          size={"icon"}
          className="no-underline text-muted-foreground hover:text-primary absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100"
        >
          <ChevronsLeft className="h-5 w-5" />
          <span className="sr-only">collapse sidenav</span>
        </Button>

        <div className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0" />
      </aside>
    </>
  )
}
