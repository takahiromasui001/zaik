import React from 'react'
import 'antd/dist/antd.css'
import StockList from './StockList'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const Stock = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <StockList />
        </Route>
      </Switch>
    </Router>
  )
}

export default Stock
