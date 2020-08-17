import axios from 'axios'

export const initialAxiosDefaultSetting = () => {
  axios.defaults.withCredentials = true
}
