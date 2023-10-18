"use client"

import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/clerk-react"
import { useMutation } from "convex/react"
import { FolderOpenDot, Plus } from "lucide-react"
import { toast } from "sonner"

export default function DocumentsPage() {
  const { user } = useUser()
  const create = useMutation(api.documents.create)

  const onCreate = () => {
    const promise = create({ title: "Untitled" })

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Oops! Failed to created a the note. Try again.",
    })
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8">
      <FolderOpenDot className="h-52 w-52 opacity-20" />

      <h2 className="text-lg font-medium">
        Howdy {user?.username}, to your Jet docs
      </h2>

      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-muted-foreground font-light">
          Seems like your docs is empty. Change that?
        </p>

        <Button onClick={onCreate}>
          <Plus className="h-5 w-5 mr-2" />
          Create a note
        </Button>
      </div>
    </div>
  )
}
