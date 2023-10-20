"use client"

import { Doc } from "@/convex/_generated/dataModel"
import React, { ElementRef, useEffect, useRef, useState } from "react"
import IconPicker from "./icon-picker"
import { Button } from "@/components/ui/button"
import { ImageIcon, Smile, X } from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import TextareaAutosize from "react-textarea-autosize"
import { useCoverImage } from "@/store/use-cover-image"

interface ToolbarProps {
  initialData: Doc<"documents">
  preview?: boolean
}

export default function Toolbar({ initialData, preview }: ToolbarProps) {
  const inputRef = useRef<ElementRef<"textarea">>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(initialData?.title || "Untitled")
  const { onOpen } = useCoverImage()

  const update = useMutation(api.documents.update)
  const removeIcon = useMutation(api.documents.removeIcon)

  useEffect(() => {
    setTitle(initialData.title)
  }, [initialData.title])

  const enableInput = () => {
    if (preview) return

    setTitle(initialData.title)
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
    }, 0)
  }

  const disableInput = () => {
    setIsEditing(false)

    if (title !== initialData.title) {
      update({ id: initialData._id, title: title || "Untitled" })
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      disableInput()
    }
  }

  const onIconSelect = (icon: string) => {
    update({ id: initialData._id, icon })
  }

  const onRemoveIcon = () => {
    removeIcon({ id: initialData._id })
  }

  return (
    <div className="group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-start gap-x-1 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <span className="text-6xl hover:opacity-70 transition">
              {initialData.icon}
            </span>
          </IconPicker>

          <Button
            onClick={onRemoveIcon}
            title="Remove icon"
            variant={"ghost"}
            size={"icon"}
            className="rounded-full -mt-4 opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground"
          >
            <X className="h-4 x-4" />
            <span className="sr-only">remove icon</span>
          </Button>
        </div>
      )}

      {!!initialData.icon && preview && (
        <span className="text-6xl pt-6">{initialData.icon}</span>
      )}

      <div className="md:opacity-0 md:translate-y-2 group-hover:translate-y-0 transition group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              variant={"ghost"}
              size={"sm"}
              className="text-muted-foreground/50 md:text-muted-foreground text-xs"
            >
              <Smile className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Add icon</span>
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            onClick={onOpen}
            variant={"ghost"}
            size={"sm"}
            className="text-muted-foreground/50 md:text-muted-foreground text-xs"
          >
            <ImageIcon className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">Add cover</span>
          </Button>
        )}
      </div>
      {isEditing ? (
        <TextareaAutosize
          ref={inputRef}
          onChange={onChange}
          onBlur={disableInput}
          onClick={enableInput}
          onKeyDown={onKeyDown}
          value={title}
          className="text-5xl break-words font-bold bg-transparent outline-none resize-none"
        />
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={enableInput}
          className="text-5xl break-words font-bold p-0 focus-visible:ring"
        >
          {title}
        </div>
      )}
    </div>
  )
}
