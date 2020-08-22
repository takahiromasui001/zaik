import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialAuthState = {
  loginCheck: true,
  error: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    disableLoginCheck(state) {
      state.loginCheck = false
    },
    receiveLoginError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    resetLoginError(state) {
      state.error = ''
    },
  },
})

export const {
  disableLoginCheck,
  receiveLoginError,
  resetLoginError,
} = authSlice.actions

export default authSlice.reducer
