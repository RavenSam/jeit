import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { useMutation } from "convex/react"
import {
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@clerk/clerk-react"

interface ItemProps {
  id?: Id<"documents">
  documentIcon?: string
  active?: boolean
  expanded?: boolean
  isSearch?: boolean
  level?: number
  onExpand?: () => void
  onClick?: () => void
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
  const { user } = useUser()
  const router = useRouter()
  const create = useMutation(api.documents.create)
  const archive = useMutation(api.documents.archive)

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

        router.push(`/documents/${documentId}`)
      }
    )

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Oops! Failed to created a the note. Try again.",
    })
  }

  const onArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()

    if (!id) return

    const promise = archive({ id })

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note archived",
      error: "Oops! Failed to archive note. Try again.",
    })

    router.push(`/documents`)
  }
  return (
    <div
      role="button"
      onClick={onClick}
      title={label}
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1.5 pr-1 w-full rounded-lg hover:bg-foreground/5 hover:text-foreground flex items-center text-muted-foreground font-medium",
        active && "bg-foreground/5 text-foreground"
      )}
    >
      {!!id && (
        <div
          role="button"
          onClick={handleExpand}
          className="h-full rounded-sm text-foreground/50 hover:text-foreground py-1 px-2"
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
          <Icon
            className={cn(
              "shrink-0 h-[18px] mr-2 text-muted-foreground group-hover:text-foreground",
              active && "text-foreground"
            )}
          />
        </div>
      )}

      <span className="truncate">{label}</span>

      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[12px] font-medium text-muted-foreground">
          <span className="text-sm">⌘</span>K
        </kbd>
      )}

      {!!id && (
        <div className="ml-auto flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role="button"
                className="h-full p-1 rounded-sm text-foreground/50 hover:text-foreground opacity-0 group-hover:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4 shrink-0" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
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
