"use client"

import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/clerk-react"
import { useMutation } from "convex/react"
import { FolderOpenDot, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function DocumentsPage() {
  const { user } = useUser()
  const create = useMutation(api.documents.create)
  const router = useRouter()

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    )

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Oops! Failed to created a the note. Try again.",
    })
  }

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

      <Button size={"lg"} onClick={onCreate}>
        <Plus className="h-6 w-6 mr-2" />
        Create a note
      </Button>
    </div>
  )
}
