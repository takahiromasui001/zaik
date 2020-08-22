import React from 'react'
import 'antd/dist/antd.css'
import { Layout } from 'antd'
import { useRoutes } from 'react-router-dom'
import { rootPath } from './routes'

const { Content } = Layout

function App() {
  const element = useRoutes(rootPath)

  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <Content>{element}</Content>
    </Layout>
  )
}

export default App
