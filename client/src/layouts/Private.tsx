import React from 'react'
import 'antd/dist/antd.css'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Private: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Private
