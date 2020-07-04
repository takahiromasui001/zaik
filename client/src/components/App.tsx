import React from 'react'
import 'antd/dist/antd.css'
import StockList from './StockList'
import { Layout } from 'antd'

const { Content } = Layout

function App() {
  return (
    <div className="App">
      <Content>
        <StockList />
      </Content>
    </div>
  )
}

export default App
