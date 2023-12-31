"use client"

import Cover from "@/components/cover"
import Toolbar from "@/components/toolbar"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useSettings } from "@/store/use-settings"
import { useMutation, useQuery } from "convex/react"
import dynamic from "next/dynamic"
import { useMemo } from "react"

interface DocumentPageProps {
  params: {
    documentId: Id<"documents">
  }
}

export default function DocumentPage({ params }: DocumentPageProps) {
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/editor"), {
        ssr: false,
        loading: LodingEditor,
      }),
    []
  )

  const doc = useQuery(api.documents.getById, { documentId: params.documentId })
  const update = useMutation(api.documents.update)
  const { editorWidth } = useSettings()

  const onChange = (content: string) => {
    update({ id: params.documentId, content })
  }

  if (doc === undefined) {
    return (
      <div className="pb-40">
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <Skeleton className="h-14 w-1/2" />
          <LodingEditor />
        </div>
      </div>
    )
  }

  if (doc === null) {
    return null
  }

  return (
    <div className="pb-40">
      <Cover url={doc.coverImage} />

      <div
        className="px-4 mx-auto space-y-8"
        style={{ maxWidth: `${editorWidth}px` }}
      >
        <Toolbar initialData={doc} />

        <Editor onChange={onChange} initialContent={doc.content} />
      </div>
    </div>
  )
}

const LodingEditor = () => (
  <>
    <div className="space-y-2 pt-8">
      <Skeleton className="h-4 w-[88%]" />
      <Skeleton className="h-4 w-[88%]" />
      <Skeleton className="h-4 w-[70%]" />
      <Skeleton className="h-4 w-[70%]" />
    </div>
    <div className="space-y-3 pt-2">
      <Skeleton className="h-4 w-[80%]" />
      <Skeleton className="h-4 w-[85%]" />
      <Skeleton className="h-4 w-[81%]" />
      <Skeleton className="h-4 w-[88%]" />
    </div>
  </>
)
