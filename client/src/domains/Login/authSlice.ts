import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
  loginChecked: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    disableLoginCheck(state) {
      state.loginChecked = true
    },
  },
})

export const { disableLoginCheck } = authSlice.actions

export default authSlice.reducer
