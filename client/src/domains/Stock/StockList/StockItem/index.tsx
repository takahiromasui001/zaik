import React from 'react'
import { Card, Empty } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Meta } = Card

type TStockProps = {
  id: number
  name: string
  file: string
}

const StockItem: React.FC<TStockProps> = (props) => {
  const { id, name, file } = props
  const dataURLFile = `data:image/png;base64,${file}`
  const navigate = useNavigate()

  const img = file ? (
    <img
      src={dataURLFile}
      height="100px"
      style={{ margin: '10px 0' }}
      alt="stock images"
    />
  ) : (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      style={{ margin: '10px 0' }}
      imageStyle={{ height: 70 }}
    />
  )

  const handleClick = () => {
    navigate(`${id}`)
  }

  return (
    <Card
      hoverable
      style={{ width: 120 }}
      cover={img}
      bodyStyle={{ padding: '8px 12px' }}
      onClick={handleClick}
    >
      <Meta title={name} />
    </Card>
  )
}

export default StockItem
