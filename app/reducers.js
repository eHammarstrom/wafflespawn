import { combineReducers } from 'redux';
import * as actions from './actions';

function user(state = {}, action) {
  switch (action.type) {
    case actions.ADD_USER_BOOKS:
      return Object.assign({}, state, { books: action.books });
    default:
      return state;
  }
}

export default reducer = combineReducers({ user });