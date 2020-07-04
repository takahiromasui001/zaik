import React from 'react'
import Stock from '../Stock'
import { Container } from './style'

const StockList: React.FC = () => {
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

  const stockList = stockProps.map((prop) => {
    return <Stock {...prop} />
  })
  return <Container>{stockList}</Container>
}

export default StockList
