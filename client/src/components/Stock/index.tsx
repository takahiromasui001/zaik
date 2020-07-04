import React from 'react'
import { Card, Empty } from 'antd'

const { Meta } = Card

type TStockProps = {
  name: string
}

const Stock: React.FC<TStockProps> = (props) => {
  const { name } = props

  return (
    <Card
      hoverable
      style={{ width: 120 }}
      cover={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    >
      <Meta title={name} />
    </Card>
  )
}

export default Stock
