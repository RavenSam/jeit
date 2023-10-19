"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import React from "react"
import { Button } from "@/components/ui/button"
import { ImageIcon, X } from "lucide-react"
import { useCoverImage } from "@/store/use-cover-image"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"
import { useEdgeStore } from "@/lib/edgestore"

interface CoverProps {
  url?: string
  preview?: boolean
}

export default function Cover({ url, preview }: CoverProps) {
  const { onReplace } = useCoverImage()
  const removeCover = useMutation(api.documents.removeCover)
  const params = useParams()
  const { edgestore } = useEdgeStore()

  const onRemoveCover = async () => {
    if (!url) return

    await edgestore.publicFiles.delete({ url })

    removeCover({ id: params.documentId as Id<"documents"> })
  }

  return (
    <div
      className={cn(
        "relative w-full h-[45vh] group mt-14",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}

      {url && !preview && (
        <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => onReplace(url)}
            variant={"outline"}
            size={"sm"}
            className="text-white drop-shadow-lg border-white backdrop-blur-sm bg-white/20 text-xs hover:bg-white/60 hover:text-gray-800"
          >
            <ImageIcon className="h-5 w-5 mr-2" />
            Change cover
          </Button>
          <Button
            onClick={onRemoveCover}
            variant={"outline"}
            size={"sm"}
            className="text-white drop-shadow-lg border-white backdrop-blur-sm bg-white/20 text-xs hover:bg-white/60 hover:text-gray-800"
          >
            <X className="h-5 w-5 mr-2" />
            Remove cover
          </Button>
        </div>
      )}
    </div>
  )
}
