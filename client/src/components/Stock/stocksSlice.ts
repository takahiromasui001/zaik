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

const stocksSlice = createSlice({
  name: 'stocks',
  initialState: [] as TStock[],
  reducers: {
    updateStock(state, action: PayloadAction<TStock>) {
      state.push(action.payload)
    },
    // toggleTodo(state, action) {
    //   const todo = state.find((todo) => todo.id === action.payload)
    //   if (todo) {
    //     todo.completed = !todo.completed
    //   }
    // },
  },
})

export const { updateStock } = stocksSlice.actions

export default stocksSlice.reducer
