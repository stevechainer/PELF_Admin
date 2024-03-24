import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import config from '../config/config'
import axios from 'axios'
import checkAuth from './auth'

export const loginAction = createAsyncThunk('login', async (userData) => {
  // const response = await axios.post(config.serverUrl + '/api/login', userData)
  // return response.data
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: true,
    invalid: false,
    isLoading: false,
  },
  reducers: {
    logined: (state, action) => {
      state.auth = { isAuthenticated: true, invalid: false }
    },

    invalid: (state, action) => {
      state.auth = { isAuthenticated: false, invalid: true }
    },

    logouted: (state, action) => {
      state.auth = { isAuthenticated: false, invalid: false }
    },
  },

  extraReducers: {
    [loginAction.pending]: (state) => {
      state.isLoading = true
    },
    [loginAction.fulfilled]: (state, action) => {
      state.isAuthenticated = true
      state.invalid = false
      const { token } = action.payload
      localStorage.setItem('jwtToken', token)
      checkAuth(token)
    },
    [loginAction.rejected]: (state) => {
      state.isLoading = false
      state.invalid = true
    },
  },
})

export const { logined, invalid, logouted } = authSlice.actions

export default authSlice.reducer
