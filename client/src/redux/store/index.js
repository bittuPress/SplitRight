import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger' 
import users from '../reducerSlice/Users'
import expenses from '../reducerSlice/Expenses'

const persistConfig = {
    key: 'root',
    storage,
}
const reducer = combineReducers({
    users,
    expenses
})
const persistedReducer = persistReducer(persistConfig, reducer)
export const store = configureStore({
     reducer: persistedReducer,
     middleware:[logger]
})

export const persistor = persistStore(store);