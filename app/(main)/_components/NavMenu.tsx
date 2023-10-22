import React from "react"
import { useUser } from "@clerk/clerk-react"
import { useRouter } from "next/navigation"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { MoreVertical, Trash } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function NavMenu({
  documentId,
}: {
  documentId: Id<"documents">
}) {
  const archive = useMutation(api.documents.archive)

  const { user } = useUser()
  const router = useRouter()

  const onArchive = () => {
    const promise = archive({ id: documentId })

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note archived",
      error: "Oops! Failed to archive note. Try again.",
    })

    router.push(`/documents`)
  }

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent text-muted-foreground hover:text-foreground"
          >
            <MoreVertical className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-60"
          align="end"
          alignOffset={8}
          forceMount
        >
          <DropdownMenuItem
            onClick={onArchive}
            className="cursor-pointer text-muted-foreground"
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel
            onClick={(e) => e.stopPropagation()}
            className="text-muted-foreground text-xs"
          >
            Last edited by {user?.username}
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}


NavMenu.Skeleton = function NavMenuSkeleton() {
  return <Skeleton className="h-10 w-10 rounded-md" />
}
