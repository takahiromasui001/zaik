import React from 'react'
import { HeaderContainer, Title } from './style'
import { UnorderedListOutlined } from '@ant-design/icons'

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>在庫管理システム</Title>
      <UnorderedListOutlined
        style={{ fontSize: '25px', marginLeft: 'auto', paddingRight: 13 }}
      />
    </HeaderContainer>
  )
}

export default Header
