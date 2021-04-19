import { combineReducers } from 'redux'
import authReducer from './auth'
import todoReducer from './todo'

export default combineReducers({
  auth: authReducer,
  todo: todoReducer
});