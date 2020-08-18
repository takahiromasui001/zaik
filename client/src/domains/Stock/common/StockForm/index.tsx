import React from 'react'
import { Form, Input, DatePicker, Select } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { TStorehouse } from '../..'
import moment from 'moment'
import useStorehouseList from './useStorehouseList'
import FileUploader from '../FileUploader'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../App'

const { Option } = Select

type TStockFormProps = {
  form: FormInstance
  acceptedFiles?: any
  setAcceptedFiles?: any
}

const StockForm: React.FC<TStockFormProps> = (props) => {
  const { form, acceptedFiles, setAcceptedFiles } = props
  const stock = useSelector((state: RootState) => state.stock)
  const stockForForm =
    Object.keys(stock).length !== 0
      ? {
          ...stock,
          manufacturingDate: moment(stock.manufacturingDate),
          storehouse_id: stock.storehouse.id,
        }
      : stock
  const storehouseList: TStorehouse[] = useStorehouseList()

  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
      initialValues={{ ...stockForForm }}
    >
      <Form.Item name="name" label="品名">
        <Input />
      </Form.Item>
      <Form.Item name="colorNumber" label="色番号">
        <Input />
      </Form.Item>
      <Form.Item name="manufacturingDate" label="製造年月日">
        <DatePicker />
      </Form.Item>
      <Form.Item name="quantity" label="残量">
        <Input />
      </Form.Item>
      <Form.Item name="condition" label="新品・中古">
        <Select>
          <Option value="unused">新品</Option>
          <Option value="used">中古</Option>
        </Select>
      </Form.Item>
      <Form.Item name="storehouse_id" label="保管場所">
        <Select>
          {storehouseList.map((storehouse: TStorehouse) => (
            <Option value={storehouse.id}>{storehouse.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <FileUploader
        acceptedFiles={acceptedFiles}
        setAcceptedFiles={setAcceptedFiles}
      />
    </Form>
  )
}

export default StockForm
