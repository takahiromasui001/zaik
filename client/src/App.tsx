import React from 'react'
import 'antd/dist/antd.css'
import { Layout } from 'antd'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Login from './domains/Login'
import Private from './layouts/Private'

const { Content } = Layout

function App() {
  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <Content>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Private} />
          </Switch>
        </Router>
      </Content>
    </Layout>
  )
}

export default App
