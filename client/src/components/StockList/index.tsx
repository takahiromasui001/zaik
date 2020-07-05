import React from 'react'
import Stock from '../Stock'
import { Container } from './style'

type TStock = { id: number; name: string; file: File }
type TStockList = { stocks: TStock[]; image: any }

const StockList: React.FC<TStockList> = (props) => {
  const { stocks, image } = props

  const stockList = stocks.map((prop: TStock) => {
    return <Stock {...prop} key={prop.id} image={image} />
  })
  return <Container>{stockList}</Container>
}

export default StockList
