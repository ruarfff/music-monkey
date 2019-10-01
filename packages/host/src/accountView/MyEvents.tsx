import React from 'react'
import IEvent from 'event/IEvent'
import EventBigCard from 'event/eventsView/EventBigCard'

interface IMyPlaylistsProps {
  events: IEvent[]
}

const MyPlaylists = ({ events }: IMyPlaylistsProps) => (
  <>
    {events.map((event, key) => (
      <EventBigCard event={event} key={key} />
    ))}
  </>
)

export default MyPlaylists
