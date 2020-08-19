import React from 'react'
import 'antd/dist/antd.css'
import { Outlet } from 'react-router-dom'

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

const Stock = () => {
  return <Outlet />
}

export default Stock
