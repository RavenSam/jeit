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
        <div className="py-2">
          <ModeRadio />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ModeRadio() {
  const { theme, setTheme } = useTheme()

  const modeList = ["light", "dark", "system"]

  return (
    <div className="">
      <h3 className="text-lg font-medium mb-2">Apearance</h3>
      <RadioGroup
        className="flex items-center gap-x-3"
        onValueChange={(value: string) => setTheme(value)}
        defaultValue={theme}
      >
        {modeList.map((mode) => (
          <label
            htmlFor={mode}
            key={mode}
            className="border rounded-lg shadow w-1/3 p-4 flex items-center gap-x-4 capitalize"
          >
            <RadioGroupItem value={mode} id={mode} />
            {mode}
          </label>
        ))}
      </RadioGroup>
    </div>
  )
}
