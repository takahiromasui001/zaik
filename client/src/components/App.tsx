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

const { Content } = Layout

function App() {
  return (
    <div className="App">
      <Content>
        <Router>
          <Switch>
            <Route path="/stocks">
              <Stock />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </Router>
      </Content>
    </div>
  )
}

export default App
