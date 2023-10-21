import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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

export default function TextInfo({ bareText }: TextInfoProps) {
  if (bareText == null) return

  const counts = textCount(bareText)

  return (
    <div className="fixed bottom-5 right-2 md:right-5">
      <Popover>
        <PopoverTrigger className="" asChild>
          <Button variant={"ghost"} size={"sm"} className="font-semibold text-xs opacity-50 hover:opacity-100">
            {counts.words}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-52" forceMount>
          <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
            {Object.keys(counts).map((key) => (
              <>
                <span className="font-semibold text-right">
                  {counts[key as keyof typeof counts]}
                </span>
                <span className="font-medium capitalize">{key}</span>
              </>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
