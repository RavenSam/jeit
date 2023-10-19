"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useEdgeStore } from "@/lib/edgestore"
import { useCoverImage } from "@/store/use-cover-image"
import React, { useState } from "react"
import { SingleImageDropzone } from "@/components/single-image-dropzone"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"

export function CoverImageModal() {
  const { edgestore } = useEdgeStore()
  const update = useMutation(api.documents.update)
  const params = useParams()

  const { isOpen, onClose: ModalClose, url } = useCoverImage()
  const [file, setFile] = useState<File>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onClose = () => {
    setFile(undefined)
    setIsSubmitting(false)
    ModalClose()
  }

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true)
      setFile(file)

      const res = await edgestore.publicFiles.upload({
        file,
        options: { replaceTargetUrl: url },
      })

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      })

      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={ModalClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold tracking-wide">
            Cover Image
          </DialogTitle>
        </DialogHeader>
        <div className="">
          <SingleImageDropzone
            height={200}
            disabled={isSubmitting}
            value={file}
            onChange={onChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
