"use client"

import Cover from "@/components/cover"
import Toolbar from "@/components/toolbar"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"

interface DocumentPageProps {
  params: {
    documentId: Id<"documents">
  }
}

export default function DocumentPage({ params }: DocumentPageProps) {
  const doc = useQuery(api.documents.getById, { documentId: params.documentId })

  if (doc === undefined) {
    return (
      <div className="pb-40  mt-14">
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <Skeleton className="h-14 w-1/2" />
          <div className="space-y-2 pt-8">
          <Skeleton className="h-4 w-[88%]" />
          <Skeleton className="h-4 w-[88%]" />
          <Skeleton className="h-4 w-[70%]" />
          <Skeleton className="h-4 w-[70%]" />
          </div>
          <div className="space-y-3 pt-5">
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[85%]" />
          <Skeleton className="h-4 w-[81%]" />
          <Skeleton className="h-4 w-[88%]" />
          </div>
        </div>
      </div>
    )
  }

  if (doc === null) {
    return null
  }

  return (
    <div className="pb-40  mt-14">
      <Cover url={doc.coverImage} />

      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={doc} />
      </div>
    </div>
  )
}
