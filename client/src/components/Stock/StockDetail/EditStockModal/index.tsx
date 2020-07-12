import React, { useState } from 'react'
import { Button, Modal, Form } from 'antd'
import axios from 'axios'
import { useParams } from 'react-router'
import StockForm from '../../shared/StockForm'
import { TStock } from '../..'

type TEditStockModalProps = {
  stock: TStock
  setStock: React.Dispatch<React.SetStateAction<TStock>>
}

const EditStockModal: React.FC<TEditStockModalProps> = (props) => {
  const { stock, setStock } = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const { id } = useParams()
  const [acceptedFiles, setAcceptedFiles] = useState([])

  const showModal = () => {
    setVisible(true)
  }

  const fileUpload = async (acceptedFiles: File[], id: number) => {
    let params = new FormData()
    params.append('file', acceptedFiles[0])
    const fileResponse = await axios.patch(
      `http://localhost:3000/api/v1/stocks/${id}`,
      params
    )
    return fileResponse.data.file
  }

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/stocks/${id}`,
        values
      )

      if (acceptedFiles.length === 0) {
        setStock(response.data)
      } else {
        const uploadFile = await fileUpload(acceptedFiles, response.data.id)
        setStock(Object.assign(response.data, { file: uploadFile }))
      }

      // 後処理
      form.resetFields()
      setVisible(false)
      setAcceptedFiles([])
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
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <StockForm
          stock={stock}
          form={form}
          acceptedFiles={acceptedFiles}
          setAcceptedFiles={setAcceptedFiles}
        />
      </Modal>
    </>
  )
}

export default EditStockModal
