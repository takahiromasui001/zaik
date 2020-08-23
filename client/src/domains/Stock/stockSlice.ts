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

const stockInitialState = {
  stockDetail: {} as TStock,
  errors: [] as string[],
}

const stockSlice = createSlice({
  name: 'stock',
  initialState: stockInitialState,
  reducers: {
    setStock(state, action: PayloadAction<TStock>) {
      state.stockDetail = action.payload
    },
    resetStock(state) {
      state.stockDetail = {} as TStock
    },
    setStockErrors(state, action: PayloadAction<string[]>) {
      state.errors = action.payload
    },
    resetStockErrors(state) {
      state.errors = [] as string[]
    },
  },
})

export const {
  setStock,
  resetStock,
  setStockErrors,
  resetStockErrors,
} = stockSlice.actions

export default stockSlice.reducer
