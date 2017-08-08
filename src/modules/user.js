import API from '../api';

export const SET_TOKENS = '/user/SET_TOKENS';
export const SET_USER = '/user/SET_USER';

const initialState = {
  tokens: {},
  user: {}
}

const api = new API()

export default (state = initialState, action) => {
  switch(action.type){
    case SET_TOKENS:
      return {
        ...state,
        tokens: action.tokens
      }
    case SET_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}

export const setTokens = (tokens) => {
  return (dispatch) => {
    dispatch({type: SET_TOKENS, tokens: tokens})
    api.tokens = tokens
  }
}

export const getUser = (tokens) => {
  return dispatch => {
    return api.getUser()
    .then((result) => {
      dispatch({type: SET_USER, user: result})
    })
  }
}

