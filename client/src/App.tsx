import React from 'react'
import 'antd/dist/antd.css'
import { Layout } from 'antd'
import { useRoutes } from 'react-router-dom'
import { rootPath } from './routes'
import { RootState } from '.'
import { useSelector } from 'react-redux'
import { useLoginCheck } from './common/hooks/useLoginCheck'

const { Content } = Layout

function App() {
  const element = useRoutes(rootPath)
  const { loginChecked } = useSelector((state: RootState) => state.auth)

  useLoginCheck()

  return loginChecked ? (
    <Layout style={{ backgroundColor: 'white' }}>
      <Content>{element}</Content>
    </Layout>
  ) : (
    <div>loading...</div>
  )
}

export default App
