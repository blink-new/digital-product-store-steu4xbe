import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  fileSize: string
  filetype: string
  downloadUrl?: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  clearCart: () => void
  isInCart: (productId: string) => boolean
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const { items } = get()
        const existingItem = items.find((item) => item.product.id === product.id)
        
        if (existingItem) {
          // Digital products don't need quantity increase since they're downloadable
          // Just prevent adding duplicates
          return
        }
        
        set({
          items: [...items, { id: uuidv4(), product, quantity: 1 }],
        })
      },
      removeItem: (id) => {
        const { items } = get()
        set({
          items: items.filter((item) => item.id !== id),
        })
      },
      clearCart: () => set({ items: [] }),
      isInCart: (productId) => {
        const { items } = get()
        return items.some((item) => item.product.id === productId)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)