import { Doc, Id } from "@/convex/_generated/dataModel"
import { File, MoreVertical, Trash } from "lucide-react"
import Link from "next/link"
import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useDocs from "@/hooks/use-docs"

interface FrontDocsProps {
  docs: NonNullable<Doc<"documents">[]>
}

export default function FrontDocs({ docs }: FrontDocsProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-6 mt-32">
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Your Docs
      </h1>

      <div className=" grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2">
        {docs.map((doc) => (
          <Link
            href={`/documents/${doc._id}`}
            key={doc._id}
            className="border group rounded-md transition-shadow hover:shadow p-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              {doc.icon ? (
                <span className="shrink-0 text-[20px] p-1 mr-2">
                  {doc.icon}
                </span>
              ) : (
                <span className="p-1">
                  <File className="shrink-0 h-[20px] w-[20px] mr-2 text-muted-foreground group-hover:text-foreground" />
                </span>
              )}

              <span className="font-medium text-muted-foreground group-hover:text-foreground">
                {doc.title}
              </span>
            </div>

            <MoreMenu id={doc._id} />
          </Link>
        ))}
      </div>
    </div>
  )
}

function MoreMenu({ id }: { id: Id<"documents"> }) {
  const { archiveDoc } = useDocs()

  if (!id) return

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
        <div
          role="button"
          title="More"
          className="h-full p-1 rounded-sm text-foreground/50 hover:text-foreground opacity-0 group-hover:opacity-100"
        >
          <MoreVertical className="h-5 w-5 shrink-0" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        side="bottom"
        forceMount
      >
        <DropdownMenuItem
          onClick={() => archiveDoc(id)}
          className="cursor-pointer text-muted-foreground"
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
