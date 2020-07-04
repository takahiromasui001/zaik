import React from 'react'
import Stock from '../Stock'
import { Container } from './style'

type TStock = { id: number, name: string }
type TStockList = { stocks: TStock[] }

const StockList: React.FC<TStockList> = (props) => {
  const { stocks } = props
  
  const stockProps = [
    { name: '在庫AAA' },
    { name: '在庫BBB' },
    { name: '在庫CCC' },
    { name: '在庫ABC' },
    { name: '在庫BCA' },
    { name: '在庫CAB' },
    { name: '在庫BBC' },
    { name: '在庫CCA' },
  ]

  const stockList = stocks.map((prop: TStock) => {
    return <Stock {...prop} key={prop.id}/>
  })
  return <Container>{stockList}</Container>
}

export default StockList
