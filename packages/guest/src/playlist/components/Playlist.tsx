import { AppBar, Tab, Tabs, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import SwipeableViews from 'react-swipeable-views'
import IEvent from '../../event/IEvent'
import { Action } from 'mm-shared'
import { Track } from 'mm-shared'
import { User } from 'mm-shared'
import ITrackVoteStatus from '../../vote/ITrackVoteStatus'
import IVote from '../../vote/IVote'
import './Playlist.scss'
import ApprovedTracks from './ApprovedTracks'
import PlaylistPlayer from './PlaylistPlayer'
import IPlaylistItem from '../IPlaylistItem'
import LoadingSpinner from '../../loading/LoadingSpinner'
import MaybeTracks from './MaybeTracks'
import IDecoratedSuggestion from '../../suggestion/IDecoratedSuggestion'

interface IPlayListProps extends RouteComponentProps<any> {
  user: User
  event: IEvent
  votes: Map<string, ITrackVoteStatus>
  suggestions: IDecoratedSuggestion[]
  createVote(vote: IVote): Action
  deleteVote(voteId: string): Action
  setEventId(eventId: string): Action
}

const Playlist = ({
  user,
  event,
  votes,
  suggestions,
  createVote,
  deleteVote,
  setEventId,
  match
}: IPlayListProps) => {
  const [value, setValue] = useState(0)
  const [currentTrack, setCurrentTrack] = useState({} as Track)
  const eventId = match.params.eventId
  const trackId = currentTrack ? currentTrack.uri : ''
  const playlist = event.playlist
  const tracks =
    playlist && playlist.tracks && playlist.tracks.items
      ? playlist.tracks.items.map((item: IPlaylistItem) => item.track)
      : []
  let voteStatus = {} as ITrackVoteStatus
  if (votes && votes.has(trackId)) {
    voteStatus = votes.get(trackId) || ({} as ITrackVoteStatus)
  }
  if (tracks.length > 0 && isEmpty(currentTrack)) {
    setCurrentTrack(tracks[0])
  }

  // Clear track on event change
  useEffect(() => {
    return () => {
      setCurrentTrack({} as Track)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event])

  useEffect(() => {
    if (event.eventId !== eventId) {
      setEventId(eventId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId])

  const handleChange = (e: any, value: any) => {
    setValue(value)
  }

  const handleTrackVote = (track: Track) => {
    const trackId = track.uri
    const eventId = !!event ? event.eventId : ''

    if (votes && votes.has(trackId)) {
      const voteStatus = votes.get(trackId)
      if (voteStatus && voteStatus.votedByCurrentUser) {
        deleteVote(`${trackId}:${eventId}:${user.userId}`)
        return
      }
    }
    const vote = {
      eventId,
      trackId,
      userId: user.userId
    } as IVote
    createVote(vote)
  }

  if (isEmpty(playlist) || event.eventId !== eventId) {
    return <LoadingSpinner />
  }

  return (
    <div className="Playlist-tabs">
      {!!currentTrack && (
        <PlaylistPlayer
          tracks={tracks}
          selectedTrack={currentTrack}
          selectedTrackVotes={voteStatus}
          onFavouriteClicked={handleTrackVote}
          onTrackChanged={setCurrentTrack}
        />
      )}

      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          classes={{ indicator: 'indicator-color' }}
        >
          <Tab label="APPROVED" />
          <Tab label="MAYBE" />
        </Tabs>
      </AppBar>
      <SwipeableViews axis={'x'} index={value} onChangeIndex={setValue}>
        {value === 0 ? (
          <Typography component="div" dir={'0'} style={{ padding: 10 }}>
            <ApprovedTracks
              playlist={playlist}
              votes={votes}
              onTrackSelected={setCurrentTrack}
              onVote={handleTrackVote}
            />
          </Typography>
        ) : (
          <div />
        )}
        {value === 1 ? (
          <Typography component="div" dir={'1'}>
            <MaybeTracks suggestions={suggestions} selectedEvent={event} />
          </Typography>
        ) : (
          <div />
        )}
      </SwipeableViews>
    </div>
  )
}

export default Playlist
