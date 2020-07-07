import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, Input } from 'antd'
import { TStock } from '..'
import axios from 'axios'
import { useParams } from 'react-router'

type TStockDetailFormModalProps = Partial<TStock>

const StockDetailFormModal: React.FC<TStockDetailFormModalProps> = (props) => {
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
      console.log(response)
    })
  }
  const handleCancel = () => {
    console.log('handleCancel')
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
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ ...props }}
        >
          <Form.Item name="name" label="品名">
            <Input />
          </Form.Item>
          <Form.Item name="colorNumber" label="色番号">
            <Input />
          </Form.Item>
          <Form.Item name="manufacturingDate" label="製造年月日">
            <Input />
          </Form.Item>
          <Form.Item name="quantity" label="残量">
            <Input />
          </Form.Item>
          <Form.Item name="used" label="新品・中古">
            <Input />
          </Form.Item>
          <Form.Item name="storehouse" label="保管場所">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default StockDetailFormModal
