import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './user';
import playlists from './playlists';
import tracks from './tracks';

export default combineReducers({
  routing: routerReducer,
  user,
  tracks,
  playlists
})