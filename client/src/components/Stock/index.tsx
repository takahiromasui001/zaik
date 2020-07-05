import React from 'react'
import { Card, Empty } from 'antd'

const { Meta } = Card

type TStockProps = {
  name: string
  image: any
}

const Stock: React.FC<TStockProps> = (props) => {
  const { name, image } = props

  const src = ``

  return (
    <Card
      hoverable
      style={{ width: 120 }}
      // cover={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      cover={<img src={`data:image/png;base64,${image}`} />}
    >
      <Meta title={name} />
    </Card>
  )
}

export default Stock
