import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Grid} from 'semantic-ui-react';
import UserInfo from './userInfo';
import Playlists from '../playlist';

import {setTokens, getUser} from '../../modules/user';
import {getUserAndPlaylists} from '../../modules/playlists'
import {getPlaylistSongs} from '../../modules/tracks';


class User extends React.Component{

  componentWillMount(){
    this.props.setTokens(this.props.match.params)
    this.props.getUserAndPlaylists()
  }

  render(){
    return (
      <Grid className="page">
        <Grid.Row columns={2}>
          <Grid.Column>
            <UserInfo user={this.props.user}/>
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Playlists
              playlists={this.props.playlists}
              getSongs={this.props.getPlaylistSongs}
             />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  playlists: state.playlists.playlists
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setTokens,
  getUser,
  getUserAndPlaylists,
  getPlaylistSongs
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)