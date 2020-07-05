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
  const [image, setImage] = useState('')

  useEffect(() => {
    const getStocks = async () => {
      const response = await axios.get('http://localhost:3000/api/v1/stocks/')

      setStocks(response.data)
    }

    const getStocksImage = async () => {
      const response = await axios.get(
        'http://localhost:3000/api/v1/stocks/1/download',
        { responseType: 'arraybuffer' }
      )
      const base64Data = Buffer.from(response.data, 'binary').toString('base64')
      setImage(base64Data)
    }

    getStocks()
    getStocksImage()
  }, [])

  return (
    <div className="App">
      <Content>
        <SearchForm />
        <StockList stocks={stocks} image={image} />
        <FileUploader />
      </Content>
    </div>
  )
}

export default App
