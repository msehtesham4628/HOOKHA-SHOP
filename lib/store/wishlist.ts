'use client'

import { create } from 'zustand'

interface WishlistItem {
  productId: string
  addedAt: Date
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlist = create<WishlistStore>((set, get) => ({
  items: [],

  addItem: (productId: string) => {
    const { isInWishlist } = get()
    if (!isInWishlist(productId)) {
      set((state) => ({
        items: [...state.items, { productId, addedAt: new Date() }],
      }))
    }
  },

  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    }))
  },

  isInWishlist: (productId: string) => {
    return get().items.some((i) => i.productId === productId)
  },

  clearWishlist: () => {
    set({ items: [] })
  },
}))
