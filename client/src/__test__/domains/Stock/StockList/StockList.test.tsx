import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import StockList from '../../../../domains/Stock/StockList'
import { omit as _omit } from 'lodash'

jest.mock('axios')
jest.mock('react-redux', () => {
  return {
    useDispatch: () => () => {
      // do nothing
    },
    useSelector: () => {
      return { errors: [], stockDetail: {} }
    },
  }
})
jest.mock('react-router-dom')

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('StockList', () => {
  test('StockListのレンダリング', async () => {
    const stocks = [
      { name: 'stock0', file: null, id: 1 },
      { name: 'stock1', file: null, id: 2 },
      { name: 'stock2', file: null, id: 3 },
    ]

    axios.get.mockImplementationOnce(() => Promise.resolve({ data: stocks }))

    render(<StockList />)
    await waitFor(() => screen.getByText('stock0'))
    screen.getByText('stock1')
    screen.getByText('stock2')
    screen.getByPlaceholderText('品名で検索')
  })

  test('品名で検索', async () => {
    const myMock = jest.fn(() => Promise.resolve({ data: [] }))
    axios.get.mockImplementation(myMock)

    render(<StockList />)

    const searchWord = '紙'
    userEvent.type(screen.getByPlaceholderText('品名で検索'), searchWord)
    userEvent.click(screen.getByRole('img', { name: 'search' }))

    await waitFor(() =>
      expect(myMock.mock.calls[1][0]).toBe(
        `http://localhost:3000/api/v1/stocks/?search=${searchWord}`
      )
    )
  })

  test('新規在庫の登録', async () => {
    const openStockList = () => {
      const myGetMock = jest.fn(() => Promise.resolve({ data: [] }))
      axios.get.mockImplementation(myGetMock)
      render(<StockList />)
    }
    const openCreateStockForm = () => {
      const myStorehouseGetMock = jest.fn(() =>
        Promise.resolve({ data: [{ name: 'store1', id: 1 }] })
      )
      axios.get.mockImplementationOnce(myStorehouseGetMock)

      userEvent.click(screen.getByRole('img', { name: 'plus-circle' }))
    }
    const inputForm = async () => {
      userEvent.type(screen.getByText('品名'), 'stock1')
      userEvent.type(screen.getByText('色番号'), '0004')
      userEvent.type(screen.getByText('製造年月日'), '2020-09-01')
      userEvent.type(screen.getByText('残量'), '20')
      userEvent.click(screen.getByLabelText('新品・中古'))
      await waitFor(() => userEvent.click(screen.getByText('新品')))
      userEvent.click(screen.getByLabelText('保管場所'))
      await waitFor(() => userEvent.click(screen.getByText('store1')))
    }

    openStockList()
    openCreateStockForm()
    expect(screen.queryByText('在庫情報の新規作成')).toBeVisible()
    await inputForm()

    const myPostMock = jest.fn(() =>
      Promise.resolve({ data: { name: 'stock1', id: 1 } })
    )
    axios.post.mockImplementation(myPostMock)
    userEvent.click(screen.getByText('OK'))

    await waitFor(() =>
      myPostMock.mock.results[0].value.then((v) =>
        expect(v.data).toEqual({ name: 'stock1', id: 1 })
      )
    )
    expect(screen.queryByText('在庫情報の新規作成')).not.toBeVisible()
    expect(_omit(myPostMock.mock.calls[0][1], ['manufacturingDate'])).toEqual({
      colorNumber: '0004',
      condition: 'unused',
      name: 'stock1',
      quantity: '20',
      storehouse_id: 1,
    })
    expect(
      myPostMock.mock.calls[0][1].manufacturingDate.isSame('2020-09-01')
    ).toBe(true)
  })
})
