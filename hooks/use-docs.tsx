import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function useDocs() {
  const create = useMutation(api.documents.create)
  const archive = useMutation(api.documents.archive)

  const router = useRouter()

  /**
   *
   * @param parentDocument default undefined
   * @returns
   */
  const createDoc = (parentDocument?: Id<"documents">) => {
    const promise = create({ title: "Untitled", parentDocument }).then(
      (documentId) => {
        router.push(`/documents/${documentId}`)

        return documentId
      }
    )

    toast.promise(promise, {
      loading: "Creating a new doc...",
      success: "New doc created!",
      error: "Oops! Failed to created a the doc. Try again.",
    })

    return promise
  }

  const archiveDoc = (id: Id<"documents">) => {
    const promise = archive({ id })

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Doc archived",
      error: "Oops! Failed to archive doc. Try again.",
    })

    router.push(`/documents`)
  }

  return { createDoc, archiveDoc }
}
