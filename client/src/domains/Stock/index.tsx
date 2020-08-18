import React from 'react'
import 'antd/dist/antd.css'
import { useRoutes } from 'react-router-dom'
import rootReducer from './reducers'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { stockPath } from '../../routes'

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
  file: any
}

export type TStorehouse = {
  id: number
  name: string
}

const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>

const Stock = () => {
  const element = useRoutes(stockPath)
  return <Provider store={store}>{element}</Provider>
}

export default Stock
