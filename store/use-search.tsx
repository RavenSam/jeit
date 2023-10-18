import { create } from "zustand"

interface searchState {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  toggle: () => void
}

export const useSearch = create<searchState>()((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
}))
