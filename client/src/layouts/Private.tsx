import React from 'react'
import 'antd/dist/antd.css'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { useLoginCheck } from '../common/hooks/useLoginCheck'
import { useSelector } from 'react-redux'
import { RootState } from '..'

const Private: React.FC = () => {
  const { loginCheck } = useSelector((state: RootState) => state.auth)
  useLoginCheck(loginCheck)

  return loginCheck ? (
    <div>loading...</div>
  ) : (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Private
