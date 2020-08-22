import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
  loginCheck: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    disableLoginCheck(state) {
      state.loginCheck = false
    },
  },
})

export const { disableLoginCheck } = authSlice.actions

export default authSlice.reducer
