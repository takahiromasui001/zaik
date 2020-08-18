import React from 'react'
import 'antd/dist/antd.css'
import { Layout } from 'antd'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Login from './domains/Login'
import Private from './layouts/Private'

const { Content } = Layout

function App() {
  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <Content>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Private />} />
          </Routes>
        </Router>
      </Content>
    </Layout>
  )
}

export default App
