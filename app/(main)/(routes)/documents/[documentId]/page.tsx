"use client"

import Cover from "@/components/cover"
import Toolbar from "@/components/toolbar"
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
    return <div className="">Loading...</div>
  }

  if (doc === null) {
    return null
  }

  return (
    <div className="pb-40">
      <Cover url={doc.coverImage}/>

      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={doc} />
      </div>
    </div>
  )
}
