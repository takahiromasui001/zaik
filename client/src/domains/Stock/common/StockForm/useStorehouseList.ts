import { useState, useEffect } from 'react'
import axios from 'axios'

type TStoreHouseList = { id: number; name: string }[]

const useStorehouseList = (): TStoreHouseList => {
  const [storehouseList, setStorehouseList] = useState([])

  useEffect(() => {
    const getStoreHouseList = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/storehouses`
      )
      setStorehouseList(response.data)
    }
    getStoreHouseList()
  }, [])

  return storehouseList
}

export default useStorehouseList
