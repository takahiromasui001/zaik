import React, { useState } from 'react'
import { Modal, Form } from 'antd'
import axios from 'axios'
import StockForm from '../../shared/StockForm'
import { TStock } from '../..'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { Container } from './style'

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
    <Container>
      <PlusCircleTwoTone
        onClick={showModal}
        style={{ fontSize: '30px' }}
        twoToneColor="#BFBFBF"
      />
      <Modal
        title="在庫情報の新規作成"
        visible={visible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <StockForm form={form} />
      </Modal>
    </Container>
  )
}

export default CreateStockFormModal
