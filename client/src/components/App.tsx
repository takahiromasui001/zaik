import React from 'react'
import 'antd/dist/antd.css'
import StockList from './StockList'
import { Layout } from 'antd'
import SearchForm from './SearchForm'

const { Content } = Layout

function App() {
  return (
    <div className="App">
      <Content>
        <SearchForm />
        <StockList />
      </Content>
    </div>
  )
}

export default App
