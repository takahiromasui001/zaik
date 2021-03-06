import React, { useState } from 'react'
import { Modal, Form } from 'antd'
import axios from 'axios'
import StockForm from '../../common/StockForm'
import { TStock } from '../..'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { Container } from './style'
import { useDispatch } from 'react-redux'
import { resetStock, setStockErrors, resetStockErrors } from '../../stockSlice'

type TCreateStockFormModalProps = {
  stocks: TStock[]
  setStocks: React.Dispatch<React.SetStateAction<TStock[]>>
}

const CreateStockFormModal: React.FC<TCreateStockFormModalProps> = (props) => {
  const { stocks, setStocks } = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const [acceptedFiles, setAcceptedFiles] = useState([] as File[])
  const dispatch = useDispatch()

  const showModal = () => {
    dispatch(resetStock())
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
        const response = await axios.post(
          `http://localhost:3000/api/v1/stocks`,
          values
        )
        if (acceptedFiles.length === 0) {
          setStocks([...stocks, response.data])
        } else {
          const uploadFile = await fileUpload(acceptedFiles, response.data.id)
          setStocks([
            ...stocks,
            Object.assign(response.data, {
              file: uploadFile,
            }),
          ])
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
        <StockForm
          form={form}
          acceptedFiles={acceptedFiles}
          setAcceptedFiles={setAcceptedFiles}
        />
      </Modal>
    </Container>
  )
}

export default CreateStockFormModal
