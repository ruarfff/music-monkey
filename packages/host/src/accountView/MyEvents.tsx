import * as React from 'react'
import IEvent from 'event/IEvent'
import EventBigCard from 'eventsView/EventBigCard'

interface IMyPlaylistsProps {
  events: IEvent[]
}

class MyPlaylists extends React.PureComponent<IMyPlaylistsProps> {
  public render() {
    return (
      <>
        {this.props.events.map((event, key) => (
          <EventBigCard event={event} key={key} />
        ))}
      </>
    )
  }
}

export default MyPlaylists
