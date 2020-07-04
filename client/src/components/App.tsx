import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import axios from 'axios'
import 'antd/dist/antd.css'
import StockList from './StockList'
import SearchForm from './SearchForm'
import FileUploader from './FileUploader'

const { Content } = Layout

function App() {
  const [stocks, setStocks] = useState([])

  useEffect(() => {
    const getStocks = async () => {
      const response = await axios.get('http://localhost:3000/api/v1/stocks/')

      setStocks(response.data)
    }

    getStocks()
  }, [])

  return (
    <div className="App">
      <Content>
        <SearchForm />
        <StockList stocks={stocks}/>
        <FileUploader />
      </Content>
    </div>
  )
}

export default App
