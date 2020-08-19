import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
  loginChecked: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    finishLoginCheck(state) {
      state.loginChecked = true
    },
  },
})

export const { finishLoginCheck } = authSlice.actions

export default authSlice.reducer
