import React, { useRef, useState } from "react"
import { api } from "@/convex/_generated/api"
import { Doc } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface TitleProps {
  initialData: Doc<"documents">
}

export default function Title({ initialData }: TitleProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const update = useMutation(api.documents.update)

  const [title, setTitle] = useState(initialData?.title || "Untitled")
  const [isEditting, setisEditting] = useState(false)

  const enableInput = () => {
    setTitle(initialData.title)
    setisEditting(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
    }, 0)
  }

  const disableInput = () => {
    setisEditting(false)

    if (title !== initialData.title) {
      update({ id: initialData._id, title: title || "Untitled" })
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      disableInput()
    }
  }

  return (
    <div className="flex items-center gap-x-1">
      {!!initialData.icon && <span>{initialData.icon}</span>}

      {isEditting ? (
        <Input
          ref={inputRef}
          onChange={onChange}
          onBlur={disableInput}
          onClick={enableInput}
          onKeyDown={onKeyDown}
          value={title}
          className="h-9 px-3 font-semibold focus-visible:ring-transparent bg-transparent border-muted-foreground"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant={"ghost"}
          size={"sm"}
          className="font-semibold h-auto py-2 px-3 truncate"
        >
          {title}
        </Button>
      )}
    </div>
  )
}

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-8 w-36 rounded-md" />
}
