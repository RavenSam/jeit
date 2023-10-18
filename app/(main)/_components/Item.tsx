import { Skeleton } from "@/components/ui/skeleton"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { ChevronRight, LucideIcon } from "lucide-react"

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
  const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    onExpand?.()
  }

  return (
    <div
      role="button"
      onClick={onClick}
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1.5 pr-3 w-full rounded hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          onClick={handleExpand}
          className="h-full rounded-sm p-1 hover:bg-background/20"
        >
          <ChevronRight
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground/50 transition duration-200",
              expanded && "rotate-90"
            )}
          />
        </div>
      )}

      {documentIcon ? (
        <div className="shrink-0 text-[18px] mr-2">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}

      <span className="truncate">{label}</span>

      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[12px] font-medium text-muted-foreground">
          <span className="text-sm">⌘</span>K
        </kbd>
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
