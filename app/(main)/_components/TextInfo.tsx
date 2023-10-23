import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React from "react"

interface TextInfoProps {
  bareText: string | null
}

function textCount(text = "") {
  let wordCount = text.split(/\S+/).length - 1
  let charactersCount = text.split(/\S/g).length - 1
  let sentenceCount = text.split(/[.!?]/).length - 1
  let paragraphCount = text.split(/\n\s*\n/).filter(Boolean).length

  let countList = {
    words: wordCount,
    characters: charactersCount,
    sentences: sentenceCount,
    paragraphs: paragraphCount,
  }

  return countList
}

function kFormatter(num:number) {
  return num > 999 ? num % 1000 === 0 ? (num/1000).toFixed(0) + 'k' : (num/1000).toFixed(1) + 'k' : num
}

function numberFormat(num:number) {
  return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(num).split(",").join(" ")
}

export default function TextInfo({ bareText }: TextInfoProps) {
  if (bareText == null) return

  const counts = textCount(bareText)



  return (
    <div className="fixed bottom-5 z-10 right-2 md:right-5">
      <Popover>
        <PopoverTrigger className="" asChild>
          <Button
            variant={"ghost"}
            title="Words count"
            size={"sm"}
            className="font-semibold text-xs opacity-50 hover:opacity-100"
          >
            {kFormatter(counts.words)}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-52" forceMount>
          <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm opacity-70">
            {Object.keys(counts).map((key) => (
              <React.Fragment key={key}>
                <span className="font-semibold text-right">
                  {numberFormat(counts[key as keyof typeof counts])}
                </span>
                <span className="font-medium capitalize">{key}</span>
              </React.Fragment>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
