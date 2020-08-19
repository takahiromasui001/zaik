import { combineReducers } from 'redux'
import stock from './domains/Stock/stockSlice'
import auth from './domains/Login/authSlice'

export default combineReducers({ stock, auth })
