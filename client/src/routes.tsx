import React from 'react'
import Login from './domains/Login'
import Private from './layouts/Private'
import Stock from './domains/Stock'
import { Navigate } from 'react-router-dom'
import StockDetail from './domains/Stock/StockDetail'
import StockList from './domains/Stock/StockList'

export const rootPath = [
  { path: '/login', element: <Login /> },
  { path: '/*', element: <Private /> },
]

export const privatePath = [
  { path: 'stocks/*', element: <Stock /> },
  { path: '/', element: <Navigate to="/login" /> },
]

export const stockPath = [
  { path: '/:id', element: <StockDetail /> },
  { path: '/', element: <StockList /> },
]
