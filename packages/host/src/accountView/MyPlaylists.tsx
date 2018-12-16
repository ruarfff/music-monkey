import * as React from 'react'
import IEvent from '../event/IEvent'
import PlaylistCard from '../playlistsView/PlaylistCard'

interface IMyPlaylistsProps {
  events: IEvent[]
}

class MyPlaylists extends React.PureComponent<IMyPlaylistsProps> {
  public render() {
    return (
      <>
        {
          this.props.events.map((event: IEvent, key) =>
            event.playlist && <PlaylistCard playlist={event.playlist} key={key}/>
          )
        }
      </>
    )
  }
}

export default MyPlaylists