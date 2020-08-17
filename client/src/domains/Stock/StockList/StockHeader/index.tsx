import React from 'react'
import { Input } from 'antd'
import { Container } from './style'
import CreateStockFormModal from '../CreateStockFormModal'
import { TStock } from '../..'

const { Search } = Input

type TSearchFormProps = {
  stocks: TStock[]
  setStocks: React.Dispatch<React.SetStateAction<TStock[]>>
  setSearchParam: React.Dispatch<React.SetStateAction<string>>
}

const StockHeader: React.FC<TSearchFormProps> = (prop) => {
  const { stocks, setStocks, setSearchParam } = prop
  return (
    <Container>
      <Search
        placeholder="品名で検索"
        onSearch={(value) => setSearchParam(value)}
        style={{ width: 350 }}
      />
      <CreateStockFormModal stocks={stocks} setStocks={setStocks} />
    </Container>
  )
}

export default StockHeader
