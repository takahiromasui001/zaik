import React from 'react'
import { Form, Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setAxiosCsrfToken } from '../../common/utils/axiosSettings'
import { receiveLoginError, resetLoginError } from './authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../..'
import { Store } from 'antd/lib/form/interface'
import { ErrorMessage } from '../../common/components/atoms/ErrorMessage'

const Login = (): React.ReactElement => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { error } = useSelector((state: RootState) => state.auth)

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  const onFinish = async (values: Store) => {
    const response = await axios
      .post('http://localhost:3000/api/v1/login', values)
      .catch((error) => error.response)

    if (response.status === 200) {
      dispatch(resetLoginError())
      navigate('/stocks')
      setAxiosCsrfToken(response.headers['x-csrf-token'])
    } else {
      dispatch(receiveLoginError(response.data.message))
      navigate('/login')
      form.resetFields()
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>
        在庫管理システム(仮)にログイン
      </h2>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
      >
        <ErrorMessage message={error} />
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'ユーザ名を入力してください' }]}
        >
          <Input placeholder={'ユーザ名'} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'パスワードを入力してください' }]}
        >
          <Input.Password placeholder={'パスワード'} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            ログイン
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
