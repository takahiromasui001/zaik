import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TStock = {
  id: number
  name: string
  colorNumber: string
  manufacturingDate: string
  quantity: number
  condition: string
  storehouse: {
    id: number
    name: string
  }
  file: File
}

const stockSlice = createSlice({
  name: 'stock',
  initialState: {} as TStock,
  reducers: {
    getStock(_, action: PayloadAction<TStock>) {
      return { ...action.payload }
    },
    updateStock(state, action: PayloadAction<TStock>) {
      state = action.payload
    },
  },
})

export const { updateStock, getStock } = stockSlice.actions

export default stockSlice.reducer
