import { create } from "zustand"

const LOCAL_SETTINGS_KEY = "jet_settings"

interface SettingsState {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  toggle: () => void

  editorWidth: number
  setEditorWidth: (width: number) => void
}

export const useSettings = create<SettingsState>()((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),

  editorWidth: Number(localStorage.getItem(LOCAL_SETTINGS_KEY)) || 896,
  setEditorWidth: (width: number) => {
    localStorage.setItem(LOCAL_SETTINGS_KEY, width.toString())

    set({ editorWidth: width })
  },
}))
