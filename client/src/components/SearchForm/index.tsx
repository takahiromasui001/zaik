import React from 'react'
import { Input } from 'antd'
import { Container } from './style'

const { Search } = Input

type TSearchFormProps = {
  setSearchParam: React.Dispatch<React.SetStateAction<string>>
}

const SearchForm: React.FC<TSearchFormProps> = (prop) => {
  const { setSearchParam } = prop
  return (
    <Container>
      <Search
        placeholder="品名で検索"
        onSearch={(value) => setSearchParam(value)}
        style={{ width: 350 }}
      />
    </Container>
  )
}

export default SearchForm
