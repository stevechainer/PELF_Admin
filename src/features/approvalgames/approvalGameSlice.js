import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import config from '../../config/config'

export const getGamesContent = createAsyncThunk('game-data', async () => {
  const response = await axios.get(config.serverUrl + '/api/game', {
    approved: false,
    conclude: false,
  })
  return response.data
})

export const updateGameAction = createAsyncThunk(
  'game-update',
  async (gameData) => {
    const response = await axios.put(config.serverUrl + '/api/game', gameData)
    return response.data
  }
)

export const deleteGameAction = createAsyncThunk(
  'game-delete',
  async (gameId) => {
    const response = await axios.delete(config.serverUrl + '/api/game', {
      _id: gameId,
    })
    return response.data
  }
)

export const approvalGamesSlice = createSlice({
  name: 'approvalGames',
  initialState: {
    isLoading: true,
    games: [],
  },
  reducers: {
    declineGame: (state, action) => {
      state.isLoading = true
    },

    approveGame: (state, action) => {
      state.isLoading = true
    },
  },

  extraReducers: {
    [getGamesContent.pending]: (state) => {
      state.isLoading = true
    },
    [getGamesContent.fulfilled]: (state, action) => {
      state.games = action.payload
      state.isLoading = false
    },
    [getGamesContent.rejected]: (state) => {
      state.isLoading = false
    },
    [updateGameAction.pending]: (state) => {
      state.isLoading = true
    },
    [updateGameAction.fulfilled]: (state, action) => {
      state.games.map((item, idx) => {
        if (item._id === action.payload._id) {
          if (action.payload.approved) state.games.splice(idx, 1)
          else state.games[idx] = action.payload
        }
      })
      state.isLoading = false
    },
    [updateGameAction.rejected]: (state) => {
      state.isLoading = false
    },
    [deleteGameAction.pending]: (state) => {
      state.isLoading = true
    },
    [deleteGameAction.fulfilled]: (state, action) => {
      state.games.map((item, idx) => {
        if (item._id === action.payload._id) state.games.splice(idx, 1)
      })
      state.isLoading = false
    },
    [deleteGameAction.rejected]: (state) => {
      state.isLoading = false
    },
  },
})

// export const { infoGame, declineGame, approveGame } = approvalGamesSlice.actions

export default approvalGamesSlice.reducer
