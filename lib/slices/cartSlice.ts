import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  image: string
}

interface CartState {
  items: CartItem[]
  total: number
}

const initialState: CartState = {
  items: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cart") || "[]") : [],
  total: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity"> | CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += "quantity" in action.payload ? action.payload.quantity : 1
      } else {
        state.items.push({ ...action.payload, quantity: "quantity" in action.payload ? action.payload.quantity : 1 })
      }
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items))
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items))
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== action.payload.id)
        } else {
          item.quantity = action.payload.quantity
        }
      }
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items))
      }
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart")
      }
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
