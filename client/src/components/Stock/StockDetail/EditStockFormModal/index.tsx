import React, { useState } from 'react'
import { Button, Modal, Form } from 'antd'
import axios from 'axios'
import { useParams } from 'react-router'
import StockForm from '../../shared/StockForm'
import { TStock } from '../..'

type TEditStockFormModalProps = {
  stock: TStock
  setStock: React.Dispatch<React.SetStateAction<TStock>>
}

const EditStockFormModal: React.FC<TEditStockFormModalProps> = (props) => {
  const { stock, setStock } = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const { id } = useParams()

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/stocks/${id}`,
        values
      )
      setVisible(false)
      setStock(response.data)
    })
  }
  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <>
      <Button onClick={showModal}>編集</Button>
      <Modal
        title="在庫情報の編集"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <StockForm stock={stock} form={form} />
      </Modal>
    </>
  )
}

export default EditStockFormModal
