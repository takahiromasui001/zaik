import React, { useEffect, useState } from 'react'
import StockItem from './StockItem'
import { GridContainer } from './style'
import SearchForm from './SearchForm'
import axios from 'axios'
import { TStock } from '..'
import CreateStockFormModal from './CreateStockFormModal'

const StockList: React.FC = () => {
  const [stocks, setStocks] = useState([] as TStock[])
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

  const stockList = stocks.map((stock: TStock) => {
    return <StockItem {...stock} key={stock.id} />
  })

  return (
    <>
      <SearchForm setSearchParam={setSearchParam} />
      <GridContainer>{stockList}</GridContainer>
      <CreateStockFormModal stocks={stocks} setStocks={setStocks} />
    </>
  )
}

export default StockList
