import React from 'react'
import { HeaderContainer, Title } from './style'
import { UnorderedListOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import { useHistory } from 'react-router-dom'

const Header: React.FC = () => {
  const history = useHistory()

  function handleButtonClick(e: any) {
    console.log('click left button')
  }

  const handleMenuClick = (e: any) => {
    if (e.key === '2') {
      history.push('/login')
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">管理者ページ</Menu.Item>
      <Menu.Item key="2">ログアウト</Menu.Item>
    </Menu>
  )

  return (
    <HeaderContainer>
      <Title onClick={() => history.push('/stocks')}>在庫管理システム</Title>
      <Dropdown.Button
        overlay={menu}
        onClick={handleButtonClick}
        placement="bottomCenter"
        style={{ border: '0px', marginLeft: 'auto', paddingRight: 13 }}
        icon={<UnorderedListOutlined style={{ fontSize: '25px' }} />}
      />
    </HeaderContainer>
  )
}

export default Header