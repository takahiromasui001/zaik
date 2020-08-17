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

const stockInitialState = {} as TStock

const stockSlice = createSlice({
  name: 'stock',
  initialState: stockInitialState,
  reducers: {
    setStock(state, action: PayloadAction<TStock>) {
      return action.payload
    },
    resetStock(state, action: PayloadAction<TStock>) {
      return stockInitialState
    },
  },
})

export const { setStock, resetStock } = stockSlice.actions

export default stockSlice.reducer
