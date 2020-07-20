import React from 'react'
import 'antd/dist/antd.css'
import Stock from './Stock'
import { Layout } from 'antd'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

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
            <Route path="/logout"></Route>
            <Route path="/">
              <Stock />
            </Route>
          </Switch>
        </Router>
      </Content>
    </div>
  )
}

export default App
