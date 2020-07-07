import React from 'react'
import 'antd/dist/antd.css'
import StockList from './StockList'
import StockDetail from './StockDetail'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export type TStock = {
  id: number
  name: string
  colorNumber: string
  manufacturingDate: string
  quantity: number
  used: boolean
  storehouse: string
  file: any
}

const Stock = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:id">
          <StockDetail />
        </Route>
        <Route path="/">
          <StockList />
        </Route>
      </Switch>
    </Router>
  )
}

export default Stock
