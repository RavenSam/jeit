import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Item from "./Item"
import { cn } from "@/lib/utils"
import { FileIcon } from "lucide-react"

interface DocListProps {
  parentDocumentId?: Id<"documents">
  level?: number
  data?: Doc<"documents">
}

export default function DocumentList({
  parentDocumentId,
  data,
  level = 0,
}: DocListProps) {
  const params = useParams()
  const router = useRouter()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  })

  const onExpanded = (documentId: string) => {
    setExpanded((prev) => ({ ...prev, [documentId]: !prev[documentId] }))
  }

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`)
  }

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />

        {level === 0 && (
          <>
            <Item.Skeleton />
            <Item.Skeleton />
          </>
        )}
      </>
    )
  }

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/50",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>

      {documents.map((doc) => (
        <div key={doc._id}>
          <Item
            id={doc._id}
            label={doc.title}
            icon={FileIcon}
            documentIcon={doc.icon}
            active={params.documentId === doc._id}
            level={level}
            expanded={expanded[doc._id]}
            onClick={() => onRedirect(doc._id)}
            onExpand={() => onExpanded(doc._id)}
          />

          {expanded[doc._id] && (
            <DocumentList parentDocumentId={doc._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  )
}
