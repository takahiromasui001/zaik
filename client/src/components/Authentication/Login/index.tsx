import React from 'react'
import { Form, Input, Button } from 'antd'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  const [form] = Form.useForm()

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  const onFinish = (values: any) => {
    const nextPath = values.password === '1111aaaa' ? '/stocks' : '/login'
    if (nextPath === '/login') {
      form.resetFields()
    }
    history.push(nextPath)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
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
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Form.Item
          name="username"
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
