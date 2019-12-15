import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core'
import uniqBy from 'lodash/uniqBy'
import isEmpty from 'lodash/isEmpty'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import IEvent from 'event/IEvent'
import IPlaylist from 'playlist/IPlaylist'
import LoadingSpinner from 'loading/LoadingSpinner'
import IAction from 'IAction'
import sortEvents from 'event/sortEvents'
import backgroundImage from 'assets/music-monkey.jpg'
import './PlaylistListView.scss'

interface IPlaylistListViewProps {
  selectedEvent: IEvent
  events: IEvent[]
  eventsLoading?: boolean
  deselectEvent(): IAction
}

const PlaylistListView = ({
  selectedEvent,
  events,
  eventsLoading,
  deselectEvent
}: IPlaylistListViewProps) => {
  useEffect(() => {
    if (!isEmpty(selectedEvent)) {
      deselectEvent()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEvent])

  if (eventsLoading) {
    return <LoadingSpinner />
  }

  const { liveEvents, upcomingEvents, pastEvents } = sortEvents(events)

  const playlists = uniqBy(
    [...liveEvents, ...upcomingEvents, ...pastEvents]
      .filter((event: IEvent) => event.playlistUrl && event.playlist)
      .map(event => {
        return { ...event.playlist, eventId: event.eventId }
      }),
    'id'
  )

  if (isEmpty(playlists)) {
    return (
      <Typography align="center" variant="h6">
        It looks like you don't have any playlists yet :(
      </Typography>
    )
  }

  return (
    <List>
      {playlists.map((playlist: IPlaylist, i: number) => (
        <div className="PlaylistListView-item-wrapper" key={i}>
          <ListItem
            disabled={playlist.tracks.total < 1}
            button={true}
            component={Link}
            to={'/playlists/' + playlist.eventId}
            className={
              playlist.tracks.total < 1 ? 'PlaylistListView-disabled-link' : ''
            }
          >
            <div className="PlaylistListView-item">
              <ListItemAvatar>
                <Avatar
                  alt={playlist.name}
                  src={
                    playlist.images.length > 0
                      ? playlist.images[0].url
                      : backgroundImage
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={playlist.name}
                secondary={`${playlist.tracks.total} tracks`}
              />
            </div>
          </ListItem>

          <li>
            <Divider variant="inset" />
          </li>
        </div>
      ))}
    </List>
  )
}

export default PlaylistListView
