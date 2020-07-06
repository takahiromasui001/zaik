import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

type TStock = {
  name: string
}

const StockDetail = () => {
  let { id } = useParams()
  const [stock, setStock] = useState({} as TStock)

  useEffect(() => {
    const getStocks = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/stocks/${id}`
      )

      setStock(response.data)
    }

    getStocks()
  }, [])

  return (
    <div>
      {`StockDetail No.${id}`}
      <div>{stock.name}</div>
    </div>
  )
}

export default StockDetail
