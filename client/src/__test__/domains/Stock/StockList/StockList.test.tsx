import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import StockList from '../../../../domains/Stock/StockList'

jest.mock('axios')
jest.mock('react-redux')
jest.mock('react-router-dom')

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
})
