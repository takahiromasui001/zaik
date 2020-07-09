import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import axios from 'axios'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'

const DeleteStockModal: React.FC = (props) => {
  const [visible, setVisible] = useState(false)
  const { id } = useParams()
  let history = useHistory()

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const deleteStock = async () => {
    await axios.delete(`http://localhost:3000/api/v1/stocks/${id}`)
    history.push('/')
  }

  return (
    <>
      <Button onClick={showModal}>削除</Button>
      <Modal
        title="在庫の削除"
        visible={visible}
        onOk={deleteStock}
        onCancel={handleCancel}
      >
        この在庫を削除します。よろしいですか？
      </Modal>
    </>
  )
}

export default DeleteStockModal
