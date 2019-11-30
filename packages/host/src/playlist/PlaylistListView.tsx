import React, { useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { isEmpty, uniqBy } from 'lodash'
import IAction from 'IAction'
import LoadingSpinner from 'loading/LoadingSpinner'
import IEvent from 'event/IEvent'
import PlaylistList from './PlaylistList'
import sortEvents from 'event/sortEvents'
import IPlaylist from './IPlaylist'

interface PlaylistListViewProps {
  events: IEvent[]
  eventsLoading: boolean
  getEvents(): IAction
}

const PlaylistListView = ({
  events,
  eventsLoading,
  getEvents
}: PlaylistListViewProps) => {
  useEffect(() => {
    if (isEmpty(events) && !eventsLoading) {
      getEvents()
    }
  })
  if (eventsLoading) {
    return <LoadingSpinner />
  }

  const { pastEvents, upcomingEvents, liveEvents } = sortEvents(events)

  const playlists: IPlaylist[] = uniqBy(
    [...liveEvents, ...upcomingEvents, ...pastEvents]
      .filter((event: IEvent) => event.playlistUrl && event.playlist)
      .map(event => {
        return event.playlist!
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
