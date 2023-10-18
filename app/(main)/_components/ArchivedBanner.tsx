"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { Trash, Undo2 } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import { toast } from "sonner"

export default function ArchivedBanner({
  documentId,
}: {
  documentId: Id<"documents">
}) {
  const router = useRouter()

  const remove = useMutation(api.documents.remove)
  const restore = useMutation(api.documents.restore)

  const onRestore = () => {
    const promise = restore({ id: documentId })

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored",
      error: "Oops! Failed to restore note. Try again.",
    })
  }

  const onRemove = () => {
    const promise = remove({ id: documentId })

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted",
      error: "Oops! Failed to delete note. Try again.",
    })

    router.push("/documents")
  }

  return (
    <div className="bg-gradient-to-tl from-pink-400 to-pink-600 w-full gap-x-4 rounded-md p-4 max-w-5xl mx-auto flex items-center justify-center shadow-md">
      <p className="text-white text-sm font-semibold tracking-wide">
        This page is currently in the trash. Take actions?
      </p>

      <Button
        onClick={onRestore}
        size={"sm"}
        variant={"ghost"}
        className="bg-white/40 !text-white hover:bg-white/50"
      >
        <Undo2 className="h-5 w-5 mr-2" />
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size={"sm"}
          variant={"ghost"}
          className="bg-white/40 !text-white hover:bg-white/50"
        >
          <Trash className="h-5 w-5 mr-2" />
          Delete permanently
        </Button>
      </ConfirmModal>
    </div>
  )
}
