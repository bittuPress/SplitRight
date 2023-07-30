import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import logger from 'redux-logger' 

import users from '../reducerSlice/Users'
const reducer = combineReducers({
    users,
})

const store = configureStore({
     reducer, 
     middleware:[logger]
})

export default store;