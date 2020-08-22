import React from 'react'
import 'antd/dist/antd.css'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { useLoginCheck } from '../common/hooks/useLoginCheck'
import { useSelector } from 'react-redux'
import { RootState } from '..'

const Private: React.FC = () => {
  const { loginChecked } = useSelector((state: RootState) => state.auth)
  useLoginCheck(loginChecked)

  return loginChecked ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <div>loading...</div>
  )
}

export default Private
