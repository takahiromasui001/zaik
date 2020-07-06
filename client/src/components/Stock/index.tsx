import React from 'react'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import StockList from './StockList'

const { Content } = Layout

const Stock = () => {
  return (
    <Content>
      <StockList />
    </Content>
  )
}

export default Stock
