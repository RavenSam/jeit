"use client"

import { Button } from "@/components/ui/button"
import useDocs from "@/hooks/use-docs"
import { useUser } from "@clerk/clerk-react"
import { FolderOpenDot, Plus } from "lucide-react"

export default function DocumentsPage() {
  const { user } = useUser()
  const { createDoc } = useDocs()

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8">
      <FolderOpenDot className="h-64 w-64 opacity-20" />

      <div className="flex flex-col items-center justify-center space-y-1">
        <h2 className="text-lg font-semibold">
          Howdy {user?.username}, to your Jet docs
        </h2>

        <p className="text-muted-foreground font-light">
          Seems like your docs is empty. Change that?
        </p>
      </div>

      <Button size={"lg"} onClick={() => createDoc()}>
        <Plus className="h-6 w-6 mr-2" />
        Create a note
      </Button>
    </div>
  )
}
