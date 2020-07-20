import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'

const Login = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>
        在庫管理システム(仮称)にログイン
      </h2>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          // label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder={'ユーザ名'} />
        </Form.Item>

        <Form.Item
          // label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder={'パスワード'} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
