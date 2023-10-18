"use client"

import React, { useEffect, useState } from "react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useUser } from "@clerk/clerk-react"
import { useRouter } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useSearch } from "@/store/use-search"
import { File } from "lucide-react"

export default function SearchCommand() {
  const { user } = useUser()
  const router = useRouter()
  const docSearch = useQuery(api.documents.search)
  const [isMounted, setIsMounted] = useState(false)

  const { isOpen, onClose, toggle } = useSearch()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggle()
      }
    }

    document.addEventListener("keydown", down)

    return () => document.removeEventListener("keydown", down)
  }, [toggle])

  const onselect = (id: string) => {
    router.push(`/documents/${id}`)
    onClose()
  }

  if (!isMounted) {
    return null
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.username}'s docs...`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Documents">
          {docSearch?.map((doc) => (
            <CommandItem
              key={doc._id}
              value={`${doc._id}-${doc.title}`}
              title={doc.title}
              onSelect={() => onselect(doc._id)}
            >
              {doc.icon ? (
                <span className="mr-2 text-[18px]">{doc.icon}</span>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}

              <span className="">{doc.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
