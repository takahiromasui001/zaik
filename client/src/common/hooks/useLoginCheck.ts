import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const useLoginCheck = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchApi = async () => {
      const response = await axios
        .get('http://localhost:3000/api/v1/logged_in')
        .catch((response) => response)
      if (response.status !== 200) {
        navigate('/login')
      }
    }
    fetchApi()
  }, [dispatch, navigate])
}
