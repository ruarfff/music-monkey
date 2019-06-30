import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core'
import { isEmpty, uniqBy } from 'lodash'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import IEvent from '../../event/IEvent'
import IPlaylist from '../IPlaylist'
import LoadingSpinner from '../../loading/LoadingSpinner'
import IAction from '../../IAction'
import './PlaylistListView.scss'

interface IPlaylistListViewProps {
  selectedEvent: IEvent
  liveEvents: IEvent[]
  pastEvents: IEvent[]
  upcomingEvents: IEvent[]
  eventsLoading?: boolean
  deselectEvent(): IAction
}

const PlaylistListView = ({
  selectedEvent,
  liveEvents,
  upcomingEvents,
  pastEvents,
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
      <Typography align={'center'} variant={'h6'}>
        It looks like you don't have any playlists yet :(
      </Typography>
    )
  }

  return (
    <List>
      {playlists.map((playlist: IPlaylist, i: number) => (
        <div className="PlaylistListView-item-wrapper" key={i}>
          <Link
            to={'/playlists/' + playlist.eventId}
            className={
              playlist.tracks.total < 1 ? 'PlaylistListView-disabled-link' : ''
            }
          >
            <ListItem disabled={playlist.tracks.total < 1} button={true}>
              <div className="PlaylistListView-item">
                <ListItemAvatar>
                  <Avatar
                    alt={playlist.name}
                    src={
                      playlist.images.length > 0
                        ? playlist.images[0].url
                        : '/img/partycover-sm.png'
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={playlist.name}
                  secondary={`${playlist.tracks.total} tracks`}
                />
              </div>
            </ListItem>
          </Link>
          <li>
            <Divider variant="inset" />
          </li>
        </div>
      ))}
    </List>
  )
}

export default PlaylistListView
