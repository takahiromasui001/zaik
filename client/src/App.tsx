import React from 'react'
import 'antd/dist/antd.css'
import { Layout } from 'antd'
import { useRoutes } from 'react-router-dom'
import { rootPath } from './routes'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const { Content } = Layout

const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>

function App() {
  const element = useRoutes(rootPath)

  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <Provider store={store}>
        <Content>{element}</Content>
      </Provider>
    </Layout>
  )
}

export default App
