import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Id } from "@/convex/_generated/dataModel"
import useStickynotes from "@/hooks/use-stickynotes"
import { MoreVertical, Pin, Plus } from "lucide-react"

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
        className="w-[500px] sm:w-[540px] overflow-auto"
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
    return <p>Loading</p>
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
          className="fixed bottom-4 right-4 rounded-full"
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add a note</span>
        </Button>
      )}

      <div className="space-y-2">
        {getNotes.map((note) => (
          <div key={note._id} className="p-2 border rounded-md">
            note
            {note.content}
          </div>
        ))}
      </div>
    </div>
  )
}
