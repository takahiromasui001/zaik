import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import axios from 'axios'
import 'antd/dist/antd.css'
import StockList from './StockList'
import SearchForm from './SearchForm'

const { Content } = Layout

function App() {
  const [stocks, setStocks] = useState([])

  useEffect(() => {
    const getStocks = async () => {
      const response = await axios.get('http://localhost:3000/api/v1/stocks/')

      console.log('response')
      console.log(response)
    }

    getStocks()
  }, [])

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
