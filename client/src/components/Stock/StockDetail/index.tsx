import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Descriptions, Empty } from 'antd'
import { ImgContainer } from './style'
import EditStockFormModal from './EditFormModal'
import FileUploader from '../FileUploader'

export type TStock = {
  id: number
  name: string
  colorNumber: string
  manufacturingDate: string
  quantity: number
  used: boolean
  storehouse: string
  file: any
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

  const dataURLFile = (file: any) => `data:image/png;base64,${file}`
  const img = stock.file ? (
    <img
      src={dataURLFile(stock.file)}
      style={{ margin: '10px 0', maxHeight: 320 }}
      alt="stock images"
    />
  ) : (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      style={{ margin: '10px 0' }}
      imageStyle={{ height: 70 }}
    />
  )

  return (
    <>
      <ImgContainer>{img}</ImgContainer>

      <Descriptions bordered>
        <Descriptions.Item label="品名">{stock.name}</Descriptions.Item>
        <Descriptions.Item label="色番号">
          {stock.colorNumber}
        </Descriptions.Item>
        <Descriptions.Item label="残量">{stock.quantity}</Descriptions.Item>
        <Descriptions.Item label="製造年月日">
          {stock.manufacturingDate}
        </Descriptions.Item>
        <Descriptions.Item label="新品・中古">
          {stock.used ? '中古' : '新品'}
        </Descriptions.Item>
        <Descriptions.Item label="保管場所">
          {stock.storehouse}
        </Descriptions.Item>
      </Descriptions>
      <div style={{ marginBottom: 20 }} />
      <EditStockFormModal stock={stock} setStock={setStock} />
      <FileUploader id={stock.id} setStock={setStock} />
    </>
  )
}

export default StockDetail
