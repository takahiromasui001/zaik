import React from 'react'
import { Input } from 'antd'
import { Container } from './style'

const { Search } = Input

const SearchForm: React.FC = () => {
  return (
    <Container>
      <Search
        placeholder="品名で検索"
        onSearch={(value) => console.log(value)}
        style={{ width: 350 }}
      />
    </Container>
  )
}

export default SearchForm
