"use client"

import React, { useState } from "react"
import { BlockNoteEditor, PartialBlock } from "@blocknote/core"
import { BlockNoteView, useBlockNote } from "@blocknote/react"
import { useTheme } from "next-themes"
import { useEdgeStore } from "@/lib/edgestore"

import "@blocknote/core/style.css"
import TextInfo from "@/app/(main)/_components/TextInfo"

interface EditorProps {
  onChange: (value: string) => void
  initialContent?: string
  editable?: boolean
}

export default function Editor({
  onChange,
  initialContent,
  editable,
}: EditorProps) {
  const { resolvedTheme } = useTheme()
  const { edgestore } = useEdgeStore()
  const [bareText, setBareText] = useState<string | null>("")

  const handleUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({ file })

    return res.url
  }

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
      setBareText(editor.prosemirrorView.dom.innerText)
    },

    onEditorReady: (editor) => {
      setBareText(editor.prosemirrorView.dom.innerText)
    },

    uploadFile: handleUpload,
  })

  return (
    <div>
      <TextInfo bareText={bareText} />

      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  )
}
