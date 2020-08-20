import axios from 'axios'

export const applyAxiosDefaultSetting = () => {
  axios.defaults.withCredentials = true
}

export const setAxiosCsrfToken = (token: string) => {
  axios.defaults.headers.common['x-csrf-token'] = token
}
