import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import config from '../../config/config'
import axios from 'axios'

export const getGamesContent = createAsyncThunk('livegame-data', async () => {
	const response = await axios.post(config.serverUrl + '/api/game-data', {approved: true, conclude:false})
	return response.data;
})

export const deleteGameAction = createAsyncThunk('livegame-delete', async () => {
	const response = await axios.post(config.serverUrl + '/api/game-delete', {approved: true, conclude:false})
	return response.data;
})

export const updateGameAction = createAsyncThunk('game-update', async (gameData) => {
	const response = await axios.post(config.serverUrl + '/api/game-update', gameData)
	return response.data;
})

export const addGameAction = createAsyncThunk('livegame-add', async (game) => {
	const response = await axios.post(config.serverUrl + '/api/game-add', game)
	return response.data;
})

export const liveGameSlice = createSlice({
    name: 'liveGames',
    initialState: {
        isLoading: false,
        games : []
    },
    reducers: {
        // infoGame: (state, action) => {
        //     let { newGameObj } = action.payload
        //     state.games = [...state.games, newGameObj]
        // },

        // concludeGame: (state, action) => {
        //     let {index} = action.payload
        //     state.games.splice(index, 1)
        // },

        // addNewGame: (state, action) => {
        //     let {index} = action.payload
        //     state.games.splice(index, 1)
        // }
    },

    extraReducers: {
		[getGamesContent.pending]: state => {
			state.isLoading = true
		},
		[getGamesContent.fulfilled]: (state, action) => {
			state.games = action.payload
			state.isLoading = false
		},
		[getGamesContent.rejected]: state => {
			state.isLoading = false
		},
        [deleteGameAction.pending]: state => {
			state.isLoading = true
		},
		[deleteGameAction.fulfilled]: (state, action) => {
			state.games = action.payload.data
			state.isLoading = false
		},
		[deleteGameAction.rejected]: state => {
			state.isLoading = false
		},
        [updateGameAction.pending]: state => {
			state.isLoading = true
		},
		[updateGameAction.fulfilled]: (state, action) => {
			state.games.map((item, idx) => {
                if( item._id === action.payload._id && action.payload.conclude )
                    state.games.splice(idx, 1)
            });
			state.isLoading = false
		},
		[updateGameAction.rejected]: state => {
			state.isLoading = false
		},
        [addGameAction.pending]: state => {
			state.isLoading = true
		},
		[addGameAction.fulfilled]: (state, action) => {
			state.games.push (action.payload)
			state.isLoading = false
		},
		[addGameAction.rejected]: state => {
			state.isLoading = false
		},
    }
})

// export const { infoGame, concludeGame, addNewGame } = liveGameSlice.actions

export default liveGameSlice.reducer