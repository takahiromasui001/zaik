import React from 'react'
import Login from './domains/Login'
import Private from './layouts/Private'
import Stock from './domains/Stock'
import { Navigate } from 'react-router-dom'
import StockDetail from './domains/Stock/StockDetail'
import StockList from './domains/Stock/StockList'

export const rootPath = [
  { path: '/login', element: <Login /> },
  {
    path: '/*',
    element: <Private />,
    children: [
      {
        path: 'stocks/*',
        element: <Stock />,
        children: [
          { path: '/:id', element: <StockDetail /> },
          { path: '/', element: <StockList /> },
        ],
      },
      { path: '/', element: <Navigate to="/stocks" /> },
    ],
  },
]
