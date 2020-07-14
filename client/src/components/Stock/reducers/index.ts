import { combineReducers } from 'redux'
import stock from '../slices/stockSlice'
import acceptedFiles from '../slices/acceptedFilesSlice'

export default combineReducers({ stock, acceptedFiles })
