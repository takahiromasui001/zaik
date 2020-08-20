import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { finishLoginCheck } from '../../domains/Login/authSlice'
import { setAxiosCsrfToken } from '../utils/axiosSettings'

export const useLoginCheck = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fetchApi = async () => {
      if (location.pathname !== '/login') {
        const response = await axios
          .get('http://localhost:3000/api/v1/logged_in')
          .catch((response) => response)
        if (response.status !== 200) {
          navigate('/login')
        } else {
          setAxiosCsrfToken(response.headers['x-csrf-token'])
        }
      }

      dispatch(finishLoginCheck())
    }

    fetchApi()
  }, [dispatch, navigate])
}
