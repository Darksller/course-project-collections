import { create } from 'zustand'

export const useUiStore = create<UiStore>((set) => ({
  isAuthModelOpen: false,
  setIsAuthModelOpen: (isAuthModelOpen: boolean | undefined) =>
    set({ isAuthModelOpen }),
}))

interface UiStore {
  isAuthModelOpen: boolean | undefined
  setIsAuthModelOpen: (isAuthModelOpen: boolean | undefined) => void
}
