import { Skeleton } from "@/components/ui/skeleton"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import {
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@clerk/clerk-react"
import useDocs from "@/hooks/use-docs"

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
  const { createDoc, archiveDoc } = useDocs()

  const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    onExpand?.()
  }

  const onCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()

    if (!id) return

    createDoc(id).then((docId) => {
      if (!expanded) {
        onExpand?.()
      }
    })
  }

  const onArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()

    if (!id) return

    archiveDoc(id)
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
          title={expanded ? "Minify" : "Expand"}
          onClick={handleExpand}
          className="h-full rounded-sm text-foreground/50 hover:text-foreground p-1 pr-2"
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
              "shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground group-hover:text-foreground",
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
                title="More"
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
            title="Create document within"
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
