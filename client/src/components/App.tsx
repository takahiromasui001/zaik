import React from 'react'
import 'antd/dist/antd.css'
import Stock from './Stock'
import { Layout } from 'antd'
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom'
import Login from './Authentication/Login'
import Private from './Private'

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
