import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import { TStock } from '..'

type TStockDetailFormModalProps = Partial<TStock>

const StockDetailFormModal: React.FC<TStockDetailFormModalProps> = (props) => {
  const {
    name,
    colorNumber,
    manufacturingDate,
    quantity,
    used,
    storehouse,
    file,
  } = props
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    console.log('handleOk')
    setVisible(false)
  }
  const handleCancel = () => {
    console.log('handleCancel')
    setVisible(false)
  }

  return (
    <>
      <Button onClick={showModal}>編集</Button>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Modal Text</p>
      </Modal>
    </>
  )
}

export default StockDetailFormModal
