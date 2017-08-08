import API from '../api';
import {SET_TOKENS} from './user';

export const GET_PLAYLIST_SONGS_REQUESTED = 'songs/GET_PLAYLIST_SONGS_REQUESTED';
export const GET_PLAYLIST_SONGS = 'songs/GET_PLAYLIST_SONGS';
export const GET_PLAYLIST_SONGS_COMPLETED = 'songs/GET_PLAYLIST_SONGS_COMPLETED';

const api = new API()

const initialState = {
  id: '',
  isFetching: false,
  songs: []
}

export default (state = initialState, action) => {
  switch(action.type){
    case GET_PLAYLIST_SONGS_REQUESTED:
      return {
        ...state,
        isFetching: true
      }
    case GET_PLAYLIST_SONGS:
      return {
        ...state,
        songs: action.songs
      }
    case GET_PLAYLIST_SONGS_COMPLETED:
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

export const getPlaylistSongs = (userId, playlistId) => {
  return (dispatch) => {
    dispatch({type: GET_PLAYLIST_SONGS_REQUESTED})

    return api.getPlaylistSongs(userId, playlistId)
    .then((result) => {
      dispatch({type: GET_PLAYLIST_SONGS, songs: result})
    })
    .then(() => dispatch({type: GET_PLAYLIST_SONGS_COMPLETED}))
  }
}