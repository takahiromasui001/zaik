import React from 'react'
import 'antd/dist/antd.css'
import Stock from '../domains/Stock'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './Header'

const Private: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="stocks/*" element={<Stock />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default Private
