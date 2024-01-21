import { create } from 'zustand'

export const useUiStore = create<UiStore>((set) => ({
  isAuthModelOpen: false,
  setIsAuthModelOpen: (isAuthModelOpen: boolean | undefined) =>
    set({ isAuthModelOpen }),
  isNavSheetOpen: false,
  setIsNavSheetOpen: (isNavSheetOpen) => set({ isNavSheetOpen }),
}))

type UiStore = {
  isAuthModelOpen: boolean | undefined
  setIsAuthModelOpen: (isAuthModelOpen: boolean | undefined) => void
  isNavSheetOpen: boolean | undefined
  setIsNavSheetOpen: (isNavSheetOpen: boolean | undefined) => void
}
