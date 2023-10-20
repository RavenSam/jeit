import { create } from "zustand"

interface SettingsState {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  toggle: () => void
  
  editorWidth: number
  setEditorWidth: (width:number) => void
}

export const useSettings = create<SettingsState>()((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),


  editorWidth:896,
  setEditorWidth: (width:number) => set({ editorWidth:width }),
}))
