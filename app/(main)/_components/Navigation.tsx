import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  ChevronsLeft,
  Menu,
  Plus,
  PlusCircle,
  Search,
  Settings,
} from "lucide-react"
import { usePathname } from "next/navigation"
import React, { ElementRef, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import UserItem from "./UserItem"
import Item from "./Item"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import DocumentList from "./DocumentList"
import TrashItem from "./TrashItem"
import { useSearch } from "@/store/use-search"


export default function Navigation() {
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { onOpen } = useSearch()


  const create = useMutation(api.documents.create)

  const isResizingRef = useRef(false)
  const sidebarRef = useRef<ElementRef<"aside">>(null)
  const navbarRef = useRef<ElementRef<"div">>(null)
  const [isResetting, setIsResetting] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(isMobile)

  useEffect(() => {
    if (isMobile) {
      collapse()
    } else {
      resetWidth()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  useEffect(() => {
    if (isMobile) {
      collapse()
    }
  }, [isMobile, pathname])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()

    isResizingRef.current = true
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseup)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return

    let newWidth = e.clientX

    if (newWidth < 240) newWidth = 240
    if (newWidth > 480) newWidth = 480

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty("left", `${newWidth}px`)
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`)
    }
  }

  const handleMouseup = () => {
    isResizingRef.current = false
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseup)
  }

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false)
      setIsResetting(true)

      sidebarRef.current.style.width = isMobile ? "100%" : "240px"
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px")
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : `calc(100% - 240px)`
      )

      setTimeout(() => setIsResetting(false), 300)
    }
  }

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true)
      setIsResetting(true)

      sidebarRef.current.style.width = "0"
      navbarRef.current.style.setProperty("width", "100%")
      navbarRef.current.style.setProperty("left", "0")

      setTimeout(() => setIsResetting(false), 300)
    }
  }

  const onCreate = () => {
    const promise = create({ title: "Untitled" })

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Oops! Failed to created a the note. Try again.",
    })
  }

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[9999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <UserItem />

        <div className="pr-2 pl-1">
          <Item onClick={onOpen} label="Search" icon={Search} isSearch />

          <Item onClick={() => {}} label="Settings" icon={Settings} />

          <Item onClick={onCreate} label="New page" icon={PlusCircle} />

          <div className="mt-4">
            <DocumentList />

            <Item onClick={onCreate} label="Add a page" icon={Plus} />

            <TrashItem isMobile={isMobile}/>
          </div>
        </div>

        <Button
          variant={"link"}
          size={"icon"}
          onClick={collapse}
          className={cn(
            "no-underline text-muted-foreground hover:text-primary absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-5 w-5" />
          <span className="sr-only">collapse sidenav</span>
        </Button>

        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[9999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <Button
              variant={"link"}
              size={"icon"}
              onClick={resetWidth}
              className="text-muted-foreground hover:text-primary"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">collapse sidenav</span>
            </Button>
          )}
        </nav>
      </div>
    </>
  )
}
