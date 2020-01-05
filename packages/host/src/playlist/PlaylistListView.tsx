import React from 'react'
import { Typography } from '@material-ui/core'
import { isEmpty, uniqBy } from 'lodash'
import { Event, sortEvents } from 'mm-shared'
import PlaylistList from './PlaylistList'

interface PlaylistListViewProps {
  events: Event[]
}

const PlaylistListView = ({ events }: PlaylistListViewProps) => {
  const { pastEvents, upcomingEvents, liveEvents } = sortEvents(events)

  const playlists = uniqBy(
    [...liveEvents, ...upcomingEvents, ...pastEvents]
      .filter((event: Event) => event.playlistUrl && event.playlist)
      .map(event => {
        return { ...event.playlist!, eventId: event.eventId! }
      }),
    'id'
  )

  if (isEmpty(playlists)) {
    return (
      <div>
        <Typography align={'center'} variant={'h6'}>
          It looks like you don't have any playlists yet :(
        </Typography>
      </div>
    )
  }

  return <PlaylistList playlists={playlists} />
}

export default PlaylistListView
