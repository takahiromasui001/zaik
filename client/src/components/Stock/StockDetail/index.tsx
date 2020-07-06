import React from 'react'
import { useParams } from 'react-router-dom'

const StockDetail = () => {
  let { id } = useParams()

  return <div>{`StockDetail No.${id}`}</div>
}

export default StockDetail
