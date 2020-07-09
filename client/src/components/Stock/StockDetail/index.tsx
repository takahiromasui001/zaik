import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Descriptions, Empty } from 'antd'
import { ImgContainer } from './style'
import EditStockModal from './EditStockModal'
import FileUploader from '../shared/FileUploader'
import { TStock } from '..'
import DeleteStockModal from './DeleteStockModal'

export const condition: { [key: string]: string } = {
  unused: '新品',
  used: '中古',
}

const StockDetail = () => {
  let { id } = useParams()
  const [stock, setStock] = useState({} as TStock)

  useEffect(() => {
    const getStock = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/stocks/${id}`
      )

      setStock(response.data)
    }

    getStock()
  }, [id])

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
          {new Date(stock.manufacturingDate).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="新品・中古">
          {condition[stock.condition]}
        </Descriptions.Item>
        <Descriptions.Item label="保管場所">
          {stock.storehouse?.name}
        </Descriptions.Item>
      </Descriptions>
      <div style={{ marginBottom: 20 }} />
      <EditStockModal stock={stock} setStock={setStock} />
      <DeleteStockModal />
      <FileUploader id={stock.id} setStock={setStock} />
    </>
  )
}

export default StockDetail
