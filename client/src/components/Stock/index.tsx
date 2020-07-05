import React from 'react'
import { Card, Empty } from 'antd'

const { Meta } = Card

type TStockProps = {
  name: string
  file: any
}

const Stock: React.FC<TStockProps> = (props) => {
  const { name, file } = props
  const dataURLFile = `data:image/png;base64,${file}`
  const img = file ? (
    <img src={dataURLFile} height="100px" style={{ margin: '10px 0' }} />
  ) : (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      style={{ margin: '10px 0' }}
      imageStyle={{ height: 70 }}
    />
  )

  return (
    <Card
      hoverable
      style={{ width: 120 }}
      cover={img}
      bodyStyle={{ padding: '8px 12px' }}
    >
      <Meta title={name} />
    </Card>
  )
}

export default Stock
