import React from 'react'
import 'antd/dist/antd.css'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { useLoginCheck } from '../common/hooks/useLoginCheck'

const Private: React.FC = () => {
  useLoginCheck()

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Private
