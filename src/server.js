const express  = require('express');
const querystring = require('querystring');
const router = new express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const path = require('path');

const SERVER_PORT = 3001;
const SCOPES = ['user-read-private', 'user-read-email', 'playlist-read-private', 'playlist-read-collaborative'];
const STATE_KEY = 'spotify_auth_state';


const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static('./build'));


const spotifyApi = new SpotifyWebApi({
  clientId: "8f34772b3fc649898fe2defec11534fe",
  clientSecret: "fe59cb30bc1b4571b9e30884c95248ff",
  redirectUri: "http://localhost:3001/api/callback"
});

app.get('/api/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(STATE_KEY, state);
  let authorizeUrl = spotifyApi.createAuthorizeURL(SCOPES, state);
  res.redirect(authorizeUrl);
});

app.get('/api/callback', (req, res) => {
  const {code, state} = req.query;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;
  if (state === null ||state !== storedState) {
    res.redirect('/error/state_mismatch');
  } else {
    res.clearCookie(STATE_KEY);
    spotifyApi.authorizationCodeGrant(code).then( data =>{
      const {expires_in, access_token, refresh_token} = data.body;
      spotifyApi.setAccessToken (access_token);
      spotifyApi.setRefreshToken(refresh_token);

      res.redirect(`http://localhost:3000/user/${access_token}/${refresh_token}`);
    }).catch( err => {
      res.redirect('/error/invalid_token');
    })
  }
});

app.listen(SERVER_PORT, 'localhost', () => {
  console.log('Listening on port ' + SERVER_PORT);
})

function generateRandomString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};