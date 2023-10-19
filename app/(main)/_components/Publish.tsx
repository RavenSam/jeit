import React, { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Doc } from "@/convex/_generated/dataModel"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Check, Copy, FolderUp, Globe } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@radix-ui/react-label"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import useOrigin from "@/hooks/use-origin"
import { Input } from "@/components/ui/input"

interface PublishProps {
  doc: Doc<"documents">
}

export default function Publish({ doc }: PublishProps) {
  const update = useMutation(api.documents.update)
  const origin = useOrigin()

  const [isPublished, setPublish] = useState(doc.isPublished)
  const [copied, setCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const url = `${origin}/preview/${doc._id}`

  const onPublish = (e: boolean) => {
    setPublish(e)
    setIsSubmitting(true)
    const promise = update({ id: doc._id, isPublished: e }).then(() =>
      setIsSubmitting(false)
    )

    toast.promise(promise, {
      loading: `${e ? "Publishing" : "Unpublishing"}...`,
      success: `Note ${e ? "published" : "unpublished"}.`,
      error: `Oops! Failed to ${e ? "publish" : "unpublish"} note. Try again.`,
    })
  }

  const onCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 5000)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent text-muted-foreground hover:text-foreground"
        >
          <FolderUp className="h-5 w-5" />
          <span className="sr-only">Publish</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72" forceMount>
        <div className="flex flex-col items-center space-y-4 py-5 text-center">
          <Globe
            className={cn(
              "h-20 w-20 opacity-20",
              isPublished && "opacity-100 text-emerald-500"
            )}
          />
          <span className="text-sm font-medium opacity-70">
            {isPublished
              ? "This note is live on web"
              : "Share your work with others"}
          </span>
        </div>

        <div className="flex items-center justify-between py-2">
          <Label htmlFor="publish" className="font-bold">
            Publish
          </Label>
          <Switch
            disabled={isSubmitting}
            checked={isPublished}
            onCheckedChange={onPublish}
            id="publish"
          />
        </div>

        <div
          className={cn(
            "grid grid-rows-[0fr] transition-all duration-300",
            isPublished && "grid-rows-[1fr]"
          )}
        >
          <div
            className={cn(
              "overflow-hidden transition-all",
              isPublished && "mt-4"
            )}
          >
            <div className="flex w-full max-w-sm items-center space-x-1">
              <Input value={url} className="disabled:cursor-text" disabled />

              <Button onClick={onCopy} size={"icon"}>
                {copied ? (<Check className="h-4 w-4" />) : ( <Copy className="h-4 w-4" /> )}

                <span className="sr-only">Copy published link</span>
              </Button>

            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

Publish.Skeleton = function PublishSkeleton() {
  return <Skeleton className="h-10 w-10 rounded-md" />
}
