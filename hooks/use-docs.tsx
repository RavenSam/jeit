import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function useDocs() {
  const create = useMutation(api.documents.create)
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
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Oops! Failed to created a the note. Try again.",
    })

    return promise
  }

  return { createDoc }
}
