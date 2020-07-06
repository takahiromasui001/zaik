import React, { useEffect, useState } from 'react'
import StockItem from './StockItem'
import { GridContainer } from './style'
import SearchForm from './SearchForm'
import axios from 'axios'

type TStock = { id: number; name: string; file: File }

const StockList: React.FC = (props) => {
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

  const stockList = stocks.map((prop: TStock) => {
    return <StockItem {...prop} key={prop.id} />
  })

  return (
    <>
      <SearchForm setSearchParam={setSearchParam} />
      <GridContainer>{stockList}</GridContainer>
    </>
  )
}

export default StockList
