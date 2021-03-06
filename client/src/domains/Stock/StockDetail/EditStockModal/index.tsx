import React, { useState } from 'react'
import { Button, Modal, Form } from 'antd'
import axios from 'axios'
import { useParams } from 'react-router'
import StockForm from '../../common/StockForm'
import { setStock, setStockErrors, resetStockErrors } from '../../stockSlice'
import { useDispatch } from 'react-redux'

const EditStockModal = (): React.ReactElement => {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const { id } = useParams()
  const [acceptedFiles, setAcceptedFiles] = useState([] as File[])

  const dispatch = useDispatch()

  const showModal = () => {
    setVisible(true)
  }

  const fileUpload = async (acceptedFiles: File[], id: number) => {
    const params = new FormData()
    params.append('file', acceptedFiles[0])
    const fileResponse = await axios.patch(
      `http://localhost:3000/api/v1/stocks/${id}`,
      params
    )
    return fileResponse.data.file
  }

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const fetchApi = async () => {
        const response = await axios.patch(
          `http://localhost:3000/api/v1/stocks/${id}`,
          values
        )

        if (acceptedFiles.length === 0) {
          dispatch(setStock(response.data))
        } else {
          const uploadFile = await fileUpload(acceptedFiles, response.data.id)
          dispatch(setStock(Object.assign(response.data, { file: uploadFile })))
        }
        dispatch(resetStockErrors())

        // 後処理
        form.resetFields()
        setVisible(false)
        setAcceptedFiles([])
      }

      fetchApi().catch((error) => {
        dispatch(setStockErrors(error.response.data.message))
      })
    })
  }
  const handleCancel = () => {
    dispatch(resetStockErrors())
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
