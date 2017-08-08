import React from 'react'
import {Button} from 'semantic-ui-react'

export default () => (
  <div>
    <h1>Login</h1>
    <p>Spotify App</p>
    <Button primary>
      <a href="http://localhost:3001/api/login">Login to app</a>
    </Button>
  </div>
)