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
  file: string
}

const stockInitialState = {} as TStock

const stockSlice = createSlice({
  name: 'stock',
  initialState: stockInitialState,
  reducers: {
    setStock(state, action: PayloadAction<TStock>) {
      return action.payload
    },
    resetStock() {
      return stockInitialState
    },
  },
})

export const { setStock, resetStock } = stockSlice.actions

export default stockSlice.reducer
