import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Product {
  id: number
  title: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  stock: number
}

interface ProductsState {
  products: Product[]
  filteredProducts: Product[]
  categories: string[]
  loading: boolean
  error: string | null
  selectedCategory: string | null
  currentPage: number
  itemsPerPage: number
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  categories: [],
  loading: false,
  error: null,
  selectedCategory: null,
  currentPage: 1,
  itemsPerPage: 8,
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
      state.categories = [...new Set(action.payload.map((p) => p.category))]
      state.filteredProducts = action.payload
      state.loading = false
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
    filterByCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload
      state.currentPage = 1
      if (action.payload === null) {
        state.filteredProducts = state.products
      } else {
        state.filteredProducts = state.products.filter((p) => p.category === action.payload)
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
})

export const { setLoading, setProducts, setError, filterByCategory, setCurrentPage } = productsSlice.actions
export default productsSlice.reducer
