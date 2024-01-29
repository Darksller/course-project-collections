import { create } from 'zustand'

export const useUiStore = create<UiStore>((set) => ({
  isAuthModelOpen: false,
  setIsAuthModelOpen: (isAuthModelOpen: boolean | undefined) =>
    set({ isAuthModelOpen }),
  isNavSheetOpen: false,
  setIsNavSheetOpen: (isNavSheetOpen) => set({ isNavSheetOpen }),
  itemIdToOpen: '',
  setItemIdToOpen: (itemIdToOpen: string) => set({ itemIdToOpen }),
  isItemSheetOpen: false,
  setIsItemSheetOpen: (isItemSheetOpen: boolean) => set({ isItemSheetOpen }),
}))

export type UiStore = {
  isAuthModelOpen: boolean | undefined
  setIsAuthModelOpen: (isAuthModelOpen: boolean | undefined) => void
  isNavSheetOpen: boolean | undefined
  setIsNavSheetOpen: (isNavSheetOpen: boolean | undefined) => void
  itemIdToOpen: string
  setItemIdToOpen: (itemIdToOpen: string) => void
  isItemSheetOpen: boolean
  setIsItemSheetOpen: (isItemSheetOpen: boolean) => void
}
