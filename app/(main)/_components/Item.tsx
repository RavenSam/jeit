import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { useMutation } from "convex/react"
import { ChevronRight, LucideIcon, Plus, Router } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ItemProps {
  id?: Id<"documents">
  documentIcon?: string
  active?: boolean
  expanded?: boolean
  isSearch?: boolean
  level?: number
  onExpand?: () => void
  onClick: () => void
  label: string
  icon: LucideIcon
}

export default function Item({
  onClick,
  label,
  icon: Icon,
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand,
}: ItemProps) {
  const router = useRouter()
  const create = useMutation(api.documents.create)

  const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    onExpand?.()
  }

  const onCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()

    if (!id) return

    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.()
        }

        // router.push(`/documents/${documentId}`)
      }
    )

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Oops! Failed to created a the note. Try again.",
    })
  }

  return (
    <div
      role="button"
      onClick={onClick}
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1.5 pr-1 w-full rounded-lg hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          onClick={handleExpand}
          className="h-full rounded-sm text-foreground/50 hover:text-foreground p-1 hover:bg-background/20"
        >
          <ChevronRight
            className={cn(
              "h-4 w-4 shrink-0 transition duration-200",
              expanded && "rotate-90"
            )}
          />
        </div>
      )}

      {documentIcon ? (
        <div className="shrink-0 text-[18px] p-1 mr-2">{documentIcon}</div>
      ) : (
        <div className="p-1">
          <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
        </div>
      )}

      <span className="truncate">{label}</span>

      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[12px] font-medium text-muted-foreground">
          <span className="text-sm">⌘</span>K
        </kbd>
      )}

      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <div
            role="button"
            onClick={onCreate}
            className="h-full p-1 rounded-sm text-foreground/50 hover:text-foreground opacity-0 group-hover:opacity-100"
          >
            <Plus className="h-4 w-4 shrink-0" />
          </div>
        </div>
      )}
    </div>
  )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  )
}
