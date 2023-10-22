import LightEditor from "@/components/light-editor"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Doc, Id } from "@/convex/_generated/dataModel"
import useStickynotes from "@/hooks/use-stickynotes"
import { MoreHorizontal, MoreVertical, Pin, Plus, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import { useDebounce } from "usehooks-ts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Spinner from "@/components/spinner"
import { cn } from "@/lib/utils"

interface NotesDrawerProps {
  documentId: Id<"documents">
}

export default function NotesDrawer({ documentId }: NotesDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent text-muted-foreground hover:text-foreground"
        >
          <Pin className="h-5 w-5 rotate-45" />
          <span className="sr-only">Sticky notes</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        overlay={false}
        className="!max-w-lg pt-2.5 overflow-auto"
      >
        <SheetHeader>
          <SheetTitle>Notes</SheetTitle>
        </SheetHeader>
        <DrawerContent documentId={documentId} />
      </SheetContent>
    </Sheet>
  )
}

function DrawerContent({ documentId }: NotesDrawerProps) {
  const { getNotes, createNote } = useStickynotes({ documentId })

  if (getNotes === undefined) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] pb-12 pt-5">
      {getNotes.length === 0 && (
        <div className="min-h-[80vh] flex flex-col items-center justify-center gap-y-4">
          <p className="font-medium text-base">This doc has no notes</p>

          <Button variant={"outline"} onClick={createNote}>
            <Plus className="h-5 w-5 mr-2" />
            Add one
          </Button>
        </div>
      )}

      {getNotes.length !== 0 && (
        <Button
          onClick={createNote}
          size={"icon"}
          className="fixed z-20 bottom-4 right-4 rounded-full"
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add a note</span>
        </Button>
      )}

      <div className="relative space-y-2">
        {getNotes.map((note) => (
          <SingleNote key={note._id} note={note} />
        ))}
      </div>
    </div>
  )
}

function SingleNote({ note }: { note: Doc<"stickynotes"> }) {
  const { deleteNote, update } = useStickynotes({
    documentId: note.parentDocument,
  })

  const [value, setValue] = useState<string>(note.content || "")
  const debouncedValue = useDebounce<string>(value, 500)

  useEffect(() => {
    update({ content: value, id: note._id })
  }, [debouncedValue, update, value, note._id])

  return (
    <div className={cn(note.isSticky && "sticky top-0 bg-background z-10")}>
      <div
        className={cn(
          "relative px-2 py-6 group border rounded-md",
          note.isSticky && "border-primary"
        )}
      >
        <div className="">
          <LightEditor initialContent={value} onChange={(v) => setValue(v)} />
        </div>

        {note.isSticky && (
          <div
            onClick={() => update({ id: note._id, isSticky: false })}
            role="button"
            title="Unpin"
            className="absolute top-1 right-2 p-1 group/pin rounded-sm text-pink-500/50 hover:text-pink-500"
          >
            <Pin className="h-4 w-4 rotate-45 shrink-0 transition-all group-hover/pin:rotate-0" />
          </div>
        )}

        <div className="absolute bottom-1 right-1 flex items-center shrink-0">
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
                onClick={() => update({ id: note._id, isSticky: true })}
                className="cursor-pointer text-muted-foreground group/pin"
              >
                <Pin className="h-4 w-4 mr-2 transition-all group-hover/pin:rotate-45" />
                Pin
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => deleteNote(note._id)}
                className="cursor-pointer text-muted-foreground"
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
