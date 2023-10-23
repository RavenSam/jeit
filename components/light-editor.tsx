"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Typography from "@tiptap/extension-typography"
import Placeholder from "@tiptap/extension-placeholder"

interface EditorProps {
  onChange: (value: string) => void
  initialContent?: string
}

export default function LightEditor({ onChange, initialContent }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Typography,
      Placeholder.configure({ placeholder: "Write your note..." }),
    ],
    content: initialContent,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return <EditorContent editor={editor} className="prose dark:prose-invert w-full" />
}
