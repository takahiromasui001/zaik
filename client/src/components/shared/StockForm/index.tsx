import React from 'react'
import { Form, Input } from 'antd'
import { TStock } from '../../Stock/StockDetail'
import { FormInstance } from 'antd/lib/form'

type TStockFormProps = {
  stock: Partial<TStock>
  form: FormInstance
}

const StockForm: React.FC<TStockFormProps> = (props) => {
  const { stock, form } = props

  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
      initialValues={{ ...stock }}
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
      <Form.Item name="storehouse_id" label="保管場所">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default StockForm
