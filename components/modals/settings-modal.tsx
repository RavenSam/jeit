import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useSettings } from "@/store/use-settings"
import { useTheme } from "next-themes"
import { Laptop, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

export function SettingsDialog() {
  const { isOpen, onClose } = useSettings()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold tracking-wide">
            Settings
          </DialogTitle>
        </DialogHeader>
        <div className="py-2 space-y-6">
          <ModeRadio />

          <EditorWidth />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ModeRadio() {
  const { theme, setTheme } = useTheme()

  const modeList = [
    { label: "light", icon: Moon },
    { label: "dark", icon: Sun },
    { label: "system", icon: Laptop },
  ]

  return (
    <div className="">
      <h3 className="text-lg font-medium mb-2">Apearance Mode</h3>
      <RadioGroup
        className="flex items-center gap-x-3"
        onValueChange={(value: string) => setTheme(value)}
        defaultValue={theme}
      >
        {modeList.map((mode) => (
          <label
            htmlFor={mode.label}
            key={mode.label}
            className={cn(
              "border rounded-lg shadow w-1/3 p-4 cursor-pointer",
              theme == mode.label ? "border-primary" : "hover:bg-primary/10"
            )}
          >
            <div className="flex items-start">
              <RadioGroupItem value={mode.label} id={mode.label} />

              <div className="flex items-center flex-col gap-y-4 flex-1 -ml-2">
                <span className="-mt-1 font-medium capitalize">
                  {mode.label}
                </span>
                <mode.icon
                  className={cn(
                    "h-10 w-10 opacity-20",
                    theme == mode.label && "opacity-100"
                  )}
                />
              </div>
            </div>
          </label>
        ))}
      </RadioGroup>
    </div>
  )
}

export function EditorWidth() {
  const { editorWidth, setEditorWidth } = useSettings()

  const modeList = [
    { label: "sm", value: 672 },
    { label: "md", value: 768 },
    { label: "lg", value: 896 },
    { label: "xl", value: 1024 },
  ]

  return (
    <div className="">
      <h3 className="text-lg font-medium mb-2">Editor Width</h3>
      <RadioGroup
        className="flex items-center gap-x-3"
        onValueChange={(value: string) => setEditorWidth(+value)}
        defaultValue={editorWidth.toString()}
      >
        {modeList.map((mode) => (
          <label
            htmlFor={mode.label}
            key={mode.label}
            className={cn(
              "border rounded-lg shadow w-1/3 p-4 cursor-pointer",
              editorWidth == mode.value
                ? "border-primary"
                : "hover:bg-primary/10"
            )}
          >
            <div className="flex items-start">
              <RadioGroupItem value={mode.value.toString()} id={mode.label} />

              <div className="flex items-center flex-col gap-y-4 flex-1 -ml-2">
                <span className="-mt-1 font-medium uppercase">
                  {mode.label}
                </span>
                <span
                  className={cn(
                    "text-xl font-bold opacity-20",
                    editorWidth == mode.value && "opacity-100"
                  )}
                >
                  {mode.value}px
                </span>
              </div>
            </div>
          </label>
        ))}
      </RadioGroup>
    </div>
  )
}
