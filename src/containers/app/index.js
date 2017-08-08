import React from 'react';
import { Route} from 'react-router-dom'
import Login from '../login'
import User from '../user'

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Login} />
      <Route exact path="/user/:userToken/:refreshToken" component={User}/>
    </main>
  </div>
)

export default App