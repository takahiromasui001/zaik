import React, { useEffect, useState } from 'react'
import StockItem from './StockItem'
import { GridContainer } from './style'
import StockHeader from './StockHeader'
import axios from 'axios'
import { TStock } from '..'

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
      <StockHeader
        setSearchParam={setSearchParam}
        stocks={stocks}
        setStocks={setStocks}
      />
      <GridContainer>{stockList}</GridContainer>
    </>
  )
}

export default StockList
