import React from 'react'
import Stock from '../Stock'

const StockList: React.FC = () => {
  const stockProps = {
    name: '製品A',
  }
  return <Stock {...stockProps} />
}

export default StockList
