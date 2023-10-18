import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Item from "./Item"
import { Search, Trash, Undo, Undo2 } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useState } from "react"
import { toast } from "sonner"
import { Id } from "@/convex/_generated/dataModel"
import Spinner from "@/components/spinner"
import { Input } from "@/components/ui/input"
import { ConfirmModal } from "@/components/modals/confirm-modal"

export default function TrashItem({ isMobile }: { isMobile: boolean }) {
  return (
    <Popover>
      <PopoverTrigger className="w-full mt-4">
        <Item label="Trash" icon={Trash} />
      </PopoverTrigger>
      <PopoverContent
        side={isMobile ? "bottom" : "right"}
        align="start"
        className="p-0 w-72"
      >
        <TrashBox isMobile={isMobile} />
      </PopoverContent>
    </Popover>
  )
}

function TrashBox({ isMobile }: { isMobile: boolean }) {
  const router = useRouter()
  const params = useParams()
  const archivedDocs = useQuery(api.documents.getTrash)
  const restore = useMutation(api.documents.restore)
  const remove = useMutation(api.documents.remove)

  const [search, setSearch] = useState("")

  const filteredDocs = archivedDocs?.filter((doc) => {
    return doc.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  })

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`)
  }

  const onRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    e.stopPropagation()

    const promise = restore({ id: documentId })

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored",
      error: "Oops! Failed to restore note. Try again.",
    })
  }

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId })

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted",
      error: "Oops! Failed to delete note. Try again.",
    })

    if (params.documentId === documentId) {
      router.push("/documents")
    }
  }

  if (archivedDocs === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size={"lg"} />
      </div>
    )
  }

  return (
    <div className="text-sm">
      <div className="flex items-center p-2">
        <Search className="h-4 w-4 mr-2" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by title..."
        />
      </div>

      <div className="p-2">
        <p className="hidden last:block text-xs text-center text-muted-foreground">
          No documents found.
        </p>

        {filteredDocs?.map((doc) => (
          <div
            key={doc._id}
            role="button"
            onClick={() => onClick(doc._id)}
            className="text-sm rounded-sm w-full hover:bg-foreground/5 flex items-center text-foreground/50 hover:text-foreground justify-between"
          >
            <span className="truncate pl-2">{doc.title}</span>

            <div className="flex items-center">
              <div
                role="button"
                title="Restore"
                onClick={(e) => onRestore(e, doc._id)}
                className="h-full p-2 rounded-sm text-foreground/50 hover:text-foreground"
              >
                <Undo2 className="h-4 w-4 shrink-0" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(doc._id)}>
                <div
                  role="button"
                  title="Delete permanently"
                  className="h-full p-2 rounded-sm text-foreground/50 hover:text-foreground"
                >
                  <Trash className="h-4 w-4 shrink-0" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
