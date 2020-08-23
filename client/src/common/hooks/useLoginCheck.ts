import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { disableLoginCheck } from '../../domains/Login/authSlice'
import { setAxiosCsrfToken } from '../utils/axiosSettings'
import { Modal } from 'antd'

export const useLoginCheck = (loginCheck: boolean): void => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchApi = async () => {
      const response = await axios
        .get('http://localhost:3000/api/v1/logged_in')
        .catch((response) => response)

      if (response.status === 200) {
        setAxiosCsrfToken(response.headers['x-csrf-token'])
      } else {
        Modal.error({
          title: 'ログインチェックに失敗しました',
          content: `認証情報が確認できませんでした。再度ログインを行ってください`,
        })
        navigate('/login')
      }

      dispatch(disableLoginCheck())
    }

    if (loginCheck) {
      fetchApi()
    }
  }, [dispatch, navigate, loginCheck])
}
