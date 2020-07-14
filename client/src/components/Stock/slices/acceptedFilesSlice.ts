import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const acceptedFilesSlice = createSlice({
  name: 'acceptedFiles',
  initialState: '',
  reducers: {
    getAcceptedFiles(state) {
      return state
    },
    setAcceptedFiles(state: any, action: PayloadAction<any>) {
      return action.payload
    },
  },
})

export const { getAcceptedFiles, setAcceptedFiles } = acceptedFilesSlice.actions

export default acceptedFilesSlice.reducer
