import React from 'react'
import {Header, Icon, List} from 'semantic-ui-react';

const UserInfo = (props) => {
  let urls = props.user.external_urls || {spotify: ''}
  return (
    <div>
      <Header as='h3'>
        <Icon name="user"/>
        User info ({props.user.display_name})
      </Header>
      <List>
        <List.Item>{props.user.email}</List.Item>
        <List.Item><a href={urls.spotify}>Spotify Web Player</a></List.Item>
      </List>
    </div>
  )
}

export default UserInfo