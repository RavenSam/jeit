import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface UseStickynotesProps {
  documentId: Id<"documents">
}

export default function useStickynotes({ documentId }: UseStickynotesProps) {
  const create = useMutation(api.stickynotes.create)
  const remove = useMutation(api.stickynotes.remove)
  const update = useMutation(api.stickynotes.update)
  const getNotes = useQuery(api.stickynotes.getStickyNotes, {
    parentDocument: documentId,
  })

  const createNote = () => {
    const promise = create({ parentDocument: documentId })

    return promise
  }

  const deleteNote = (id: Id<"stickynotes">) => {
    const promise = remove({ id })

    return promise
  }

  return { createNote, deleteNote, getNotes, update }
}
