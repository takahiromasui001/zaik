import React from 'react'
import 'antd/dist/antd.css'
import { useRoutes } from 'react-router-dom'
import Header from './Header'
import { privatePath } from '../routes'

const Private: React.FC = () => {
  const element = useRoutes(privatePath)
  return (
    <>
      <Header />
      {element}
    </>
  )
}

export default Private
