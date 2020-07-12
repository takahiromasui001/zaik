import React, { useState } from 'react'
import { Button, Modal, Form } from 'antd'
import axios from 'axios'
import { useParams } from 'react-router'
import StockForm from '../../shared/StockForm'
import { updateStock } from '../stockSlice'
import { useDispatch } from 'react-redux'

const EditStockModal = () => {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const { id } = useParams()
  const [acceptedFiles, setAcceptedFiles] = useState([])

  const dispatch = useDispatch()

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
        dispatch(updateStock(response.data))
      } else {
        const uploadFile = await fileUpload(acceptedFiles, response.data.id)
        dispatch(
          updateStock(Object.assign(response.data, { file: uploadFile }))
        )
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
          form={form}
          acceptedFiles={acceptedFiles}
          setAcceptedFiles={setAcceptedFiles}
        />
      </Modal>
    </>
  )
}

export default EditStockModal
