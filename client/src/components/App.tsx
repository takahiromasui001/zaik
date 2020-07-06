import React from 'react'
import 'antd/dist/antd.css'
import Stock from './Stock'
import { Layout } from 'antd'

const { Content } = Layout

function App() {
  return (
    <div className="App">
      <Content>
        <Stock />
      </Content>
    </div>
  )
}

export default App
