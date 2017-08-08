import Spotify from 'spotify-web-api-js';

const SpotifyApi = new Spotify();

class API {
  constructor(tokens){
    this._tokens = tokens
  }

  set tokens(tokens) {
    this._tokens = tokens
  }

  get tokens(){
    return this._tokens
  }

  getUser() {
    SpotifyApi.setAccessToken(this.tokens.userToken);
    return SpotifyApi.getMe()
    .then((result)=> {
      return result
    })
  }

  getPlaylists() {
    SpotifyApi.setAccessToken(this.tokens.userToken);
    return SpotifyApi.getUserPlaylists()
    .then((result) => {
      return result;
    })
  }

  getPlaylistSongs(userId, playlistId){
    SpotifyApi.setAccessToken(this.tokens.userToken);
    return SpotifyApi.getPlaylistTracks(userId, playlistId)
    .then((result) => {return result})
  }
}

export default API