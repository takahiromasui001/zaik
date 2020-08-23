import axios from 'axios'

export const applyAxiosDefaultSetting = (): void => {
  axios.defaults.withCredentials = true
}

export const setAxiosCsrfToken = (token: string): void => {
  axios.defaults.headers.common['x-csrf-token'] = token
}
