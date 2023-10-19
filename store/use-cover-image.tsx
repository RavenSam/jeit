import { create } from "zustand"

interface CoverImageState {
  url?: string
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  toggle: () => void
  onReplace: (url: string) => void
}

export const useCoverImage = create<CoverImageState>()((set, get) => ({
  url: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true, url: undefined }),
  onClose: () => set({ isOpen: false, url: undefined }),
  toggle: () => set({ isOpen: !get().isOpen }),
  onReplace: (url: string) => set({ isOpen: true, url }),
}))
