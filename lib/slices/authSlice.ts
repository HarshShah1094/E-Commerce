import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  user: any | null
  token: string | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  loading: false,
  error: null,
  isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    loginSuccess: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.loading = false
      state.error = null
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token)
        localStorage.setItem("user", JSON.stringify(action.payload.user))
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    },
  },
})

export const { setLoading, setError, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer
