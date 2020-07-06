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
  const [searchParam, setSearchParam] = useState('')

  useEffect(() => {
    const getStocks = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/stocks/?search=${searchParam}`
      )

      setStocks(response.data)
    }

    getStocks()
  }, [searchParam])

  return (
    <div className="App">
      <Content>
        <SearchForm setSearchParam={setSearchParam} />
        <StockList stocks={stocks} />
        <FileUploader />
      </Content>
    </div>
  )
}

export default App
