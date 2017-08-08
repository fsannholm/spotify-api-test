import API from '../api';
import {SET_TOKENS} from './user';
import {getUser} from './user';

export const GET_USER_PLAYLISTS_REQUESTED = 'playlists/GET_USER_PLAYLISTS_REQUESTED'; 
export const GET_USER_PLAYLISTS = 'playlists/GET_USER_PLAYLISTS';
export const GET_USER_PLAYLISTS_COMPLETED = 'playlists/GET_USER_PLAYLISTS_COMPLETED';

const api = new API();

const initialState = {
  playlists: [],
  isFetching: false,
  offset: 0,
  total: 0,
  limit: 20
}

export default (state = initialState, action ) =>{
  switch(action.type){
    case GET_USER_PLAYLISTS_REQUESTED:
      return {
        ...state,
        isFetching: true
      }
    case GET_USER_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists.items,
        offset: action.playlists.offset,
        total: action.playlists.total,
        limit: action.playlists.limit
      }
    case GET_USER_PLAYLISTS_COMPLETED:
      return {
        ...state,
        isFetching: false
      }
    case SET_TOKENS:
      api.tokens = action.tokens
      return {
        ...state
      }
    default: 
      return state
  }
}

export const getPlaylists = (userId) =>{
  return (dispatch) => {
    dispatch({type: GET_USER_PLAYLISTS_REQUESTED})
       
    return api.getPlaylists(userId)
    .then((result) => {
      dispatch({type: GET_USER_PLAYLISTS, playlists: result})
    })
    .then(() => dispatch({type: GET_USER_PLAYLISTS_COMPLETED}))
  }
}

export const getUserAndPlaylists = () => {
  return (dispatch, getState) => {
    return dispatch(getUser()).then(() => {
      const userId = getState().user.user.id;
      return dispatch(getPlaylists(userId))
    })
  }
} 