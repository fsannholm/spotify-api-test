import React from 'react'
import {Item, Button} from 'semantic-ui-react';

class Playlist extends React.Component{
  
  renderPlaylists(){
    return this.props.playlists.map(item => {
      return (
        <Item key={item.id}>
          <Item.Image size='tiny' src={item.images[0].url}/>
          <Item.Content verticalAlign='middle'>
            <Item.Header>{item.name}</Item.Header>
            <Item.Meta>{item.tracks.total} tracks</Item.Meta>
            <Item.Extra>
              <Button 
                size='mini' 
                primary 
                onClick={() => this.props.getSongs(item.owner.id, item.id)}
              >
                View songs
              </Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      )
    })
  }

  render(){
    return (
    <Item.Group>
      {this.renderPlaylists()}
    </Item.Group>
    )
  }
}

export default Playlist