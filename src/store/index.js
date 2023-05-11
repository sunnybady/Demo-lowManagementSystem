import { legacy_createStore as createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { combineReducers } from 'redux-immutable'

import app from './modules/app'
import user from './modules/user'

const reducer = combineReducers({
    app,
    user
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store