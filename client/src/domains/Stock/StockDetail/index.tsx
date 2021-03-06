import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Descriptions, Empty, Modal } from 'antd'
import { ImgContainer } from './style'
import EditStockModal from './EditStockModal'
import DeleteStockModal from './DeleteStockModal'
import { useDispatch, useSelector } from 'react-redux'
import { setStock } from '../stockSlice'
import { RootState } from '../../..'

export const condition: { [key: string]: string } = {
  unused: '新品',
  used: '中古',
}

const StockDetail = (): React.ReactElement => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const stock = useSelector((state: RootState) => state.stock.stockDetail)

  useEffect(() => {
    const fetchStock = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/stocks/${id}`
      )

      dispatch(setStock(response.data))
    }

    fetchStock().catch(() => {
      Modal.error({
        content: `無効なリクエストです`,
      })
      navigate('/stocks')
    })
  }, [id, dispatch, navigate])

  const dataURLFile = (file: string) => `data:image/png;base64,${file}`
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
      <EditStockModal />
      <DeleteStockModal />
    </>
  )
}

export default StockDetail
