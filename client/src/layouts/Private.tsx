import React from 'react'
import 'antd/dist/antd.css'
import Stock from '../domains/Stock'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from './Header'

const Private: React.FC = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/stocks">
          <Stock />
        </Route>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </>
  )
}

export default Private
