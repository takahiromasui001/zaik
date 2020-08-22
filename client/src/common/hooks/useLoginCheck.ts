import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { disableLoginCheck } from '../../domains/Login/authSlice'
import { setAxiosCsrfToken } from '../utils/axiosSettings'

export const useLoginCheck = (loginCheck: boolean) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchApi = async () => {
      const response = await axios
        .get('http://localhost:3000/api/v1/logged_in')
        .catch((response) => response)

      response.status === 200
        ? setAxiosCsrfToken(response.headers['x-csrf-token'])
        : navigate('/login')

      dispatch(disableLoginCheck())
    }

    if (loginCheck) {
      fetchApi()
    }
  }, [dispatch, navigate, loginCheck])
}
