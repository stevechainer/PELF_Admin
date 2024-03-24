import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import config from '../../config/config'

export const getHistoryContent = createAsyncThunk('history-get', async () => {
  const response = await axios.get(config.serverUrl + '/api/history', {
    approved: false,
    conclude: false,
  })
  return response.data
})

export const updateHistory = createAsyncThunk(
  'history-update',
  async (gameData) => {
    let _gameData = {}
    Object.assign(_gameData, gameData)
    _gameData.isClaimed = true

    const response = await axios.put(
      `${config.serverUrl}/api/history/${_gameData._id}`, // Append the ID to the URL
      _gameData
    )

    return response.data
  }
)

export const deleteHistory = createAsyncThunk(
  'history-delete',
  async (gameData) => {
    const url = `${config.serverUrl}/api/history/${gameData._id}` // Construct the URL with gameId as a path parameter
    const response = await axios.delete(url)
    return response.data
  }
)

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    histories: [],
    isRefreshing: false,
  },
  // reducers: {
  //   declineGame: (state, action) => {
  //     state.isLoading = true
  //   },

  //   approveGame: (state, action) => {
  //     state.isLoading = true
  //   },
  // },

  extraReducers: {
    [getHistoryContent.fulfilled]: (state, action) => {
      state.histories = action.payload
    },

    [updateHistory.fulfilled]: (state, action) => {
      state.isRefreshing = !state.isRefreshing
    },

    [deleteHistory.fulfilled]: (state, action) => {
      const deleted = action.payload
      state.isRefreshing = !state.isRefreshing
    },
  },
})

export default historySlice.reducer
