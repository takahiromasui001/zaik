import React, { useState } from 'react'
import { Button, Modal, Form } from 'antd'
import axios from 'axios'
import StockForm from '../../shared/StockForm'
import { TStock } from '../..'

type TCreateStockFormModalProps = {
  stocks: TStock[]
  setStocks: React.Dispatch<React.SetStateAction<TStock[]>>
}

const CreateStockFormModal: React.FC<TCreateStockFormModalProps> = (props) => {
  const { stocks, setStocks } = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()

  const showModal = () => {
    setVisible(true)
  }

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      const response = await axios.post(
        `http://localhost:3000/api/v1/stocks`,
        values
      )
      setVisible(false)
      setStocks([...stocks, response.data])
      form.resetFields()
    })
  }
  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <>
      <Button onClick={showModal}>新規作成</Button>
      <Modal
        title="在庫情報の新規作成"
        visible={visible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <StockForm form={form} />
      </Modal>
    </>
  )
}

export default CreateStockFormModal
