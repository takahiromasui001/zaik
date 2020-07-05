import React from 'react'
import Stock from '../Stock'
import { Container } from './style'

type TStock = { id: number; name: string; file: File }
type TStockList = { stocks: TStock[] }

const StockList: React.FC<TStockList> = (props) => {
  const { stocks } = props

  const stockList = stocks.map((prop: TStock) => {
    return <Stock {...prop} key={prop.id} />
  })
  return <Container>{stockList}</Container>
}

export default StockList
