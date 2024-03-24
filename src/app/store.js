// import { configureStore, applyMiddleware, compose, createReducer } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// // import rootReducer from "createReducer";

// const reducer = createReducer();
// const initialState = {};
// const middleware = [thunk];

// const store = configureStore(
//     reducer,
//     initialState,
//     compose(
//         applyMiddleware(...middleware),
//         //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );
// export default store;

import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'
import liveGameSlice from '../features/livegames/liveGameSlice'
import approvalGamesSlice from '../features/approvalgames/approvalGameSlice'
import historySlice from '../features/history/historySlice'
import authSlice from './authReducers'

const combinedReducer = {
  auth: authSlice,
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  liveGames: liveGameSlice,
  approvalGames: approvalGamesSlice,
  history: historySlice,
}

export default configureStore({
  reducer: combinedReducer,
})
