"use client"

import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { Menu } from "lucide-react"
import { useParams } from "next/navigation"
import Title from "./Title"
import ArchivedBanner from "./ArchivedBanner"
import NavMenu from "./NavMenu"
import Publish from "./Publish"
import NotesDrawer from "./NotesDrawer"

interface NavbarProps {
   isCollapsed: boolean
   onResetWidth: () => void
}

export default function Navbar({ isCollapsed, onResetWidth }: NavbarProps) {
   const params = useParams()
   const doc = useQuery(api.documents.getById, {
      documentId: params.documentId as Id<"documents">,
   })

   if (doc === undefined) {
      return (
         <div className="bg-secondary px-3 py-2 w-full flex items-center justify-between">
            <Title.Skeleton />

            <div className="flex items-center gap-x-2">
               <NavMenu.Skeleton />
            </div>
         </div>
      )
   }

   if (doc === null) {
      return null
   }

   return (
      <>
         <nav className="bg-secondary/50 backdrop-blur-sm  shadow backdrop px-3 py-1 w-full flex items-center gap-x-4">
            {isCollapsed && (
               <Button
                  onClick={onResetWidth}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-transparent text-muted-foreground hover:text-foreground"
               >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">collapse sidenav</span>
               </Button>
            )}

            <div className="flex items-center justify-between w-full">
               <Title initialData={doc} />

               <div className="flex items-center gap-x-2">
                  <Publish doc={doc} />

                  <NotesDrawer documentId={doc._id} />

                  <NavMenu documentId={doc._id} />
               </div>
            </div>
         </nav>

         {doc.isArchived && <ArchivedBanner documentId={doc._id} />}
      </>
   )
}
