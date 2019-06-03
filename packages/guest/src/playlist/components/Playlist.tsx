import { AppBar, Tab, Tabs, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import SwipeableViews from 'react-swipeable-views'
import IEvent from '../../event/IEvent'
import IAction from '../../IAction'
import ITrack from '../../track/ITrack'
import MaybeTracks from '../../trackView/MaybeTracksContainer'
import IUser from '../../user/IUser'
import ITrackVoteStatus from '../../vote/ITrackVoteStatus'
import IVote from '../../vote/IVote'
import './Playlist.scss'
import ApprovedTracks from './ApprovedTracks'
import PlaylistPlayer from './PlaylistPlayer'

interface IPlayListProps extends RouteComponentProps<any> {
  user: IUser
  event: IEvent
  votes: Map<string, ITrackVoteStatus>
  selectedTrack?: ITrack
  fetchingVotes: boolean
  fetchEventVotes(eventId: string): IAction
  createVote(vote: IVote): IAction
  deleteVote(voteId: string): IAction
  selectTrack(track: ITrack): IAction
  deselectTrack(): IAction
  getSuggestions(eventId: string): IAction
  setEventId(eventId: string): IAction
}

export default ({
  user,
  event,
  votes,
  selectedTrack,
  fetchingVotes,
  fetchEventVotes,
  createVote,
  deleteVote,
  selectTrack,
  deselectTrack,
  getSuggestions,
  setEventId,
  match
}: IPlayListProps) => {
  const [value, setValue] = useState(0)
  const [showPlayer, setShowPlayer] = useState(false)
  const playlist = event.playlist

  const handleChange = (event: any, value: any) => {
    setValue(value)
  }

  const handleChangeIndex = (index: any) => {
    setValue(index)
  }

  const handleTrackVote = (track: ITrack) => {
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

  const handleTrackSelected = (track: ITrack) => {
    if (selectedTrack) {
      if (selectedTrack.id === track.id && showPlayer) {
        setShowPlayer(false)
        deselectTrack()
      } else {
        setShowPlayer(true)
      }
    } else {
      setShowPlayer(true)
    }

    selectTrack(track)
  }

  useEffect(() => {
    const eventId = match.params.eventId
    if (eventId) {
      setEventId(eventId)
      if (isEmpty(votes) && !fetchingVotes) {
        fetchEventVotes(eventId)
      }
      getSuggestions(eventId)
    }
  })

  if (isEmpty(playlist)) {
    return <div />
  }
  return (
    <div className="Playlist-tabs">
      <PlaylistPlayer
        playlist={playlist}
        selectedTrack={selectedTrack}
        votes={votes}
        handleTrackVote={handleTrackVote}
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
      <SwipeableViews
        axis={'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {value === 0 ? (
          <Typography component="div" dir={'0'} style={{ padding: 10 }}>
            <ApprovedTracks
              playlist={playlist}
              votes={votes}
              onTrackSelected={handleTrackSelected}
              onVote={handleTrackVote}
            />
          </Typography>
        ) : (
          <div />
        )}
        {value === 1 ? (
          <Typography component="div" dir={'1'}>
            <MaybeTracks />
          </Typography>
        ) : (
          <div />
        )}
      </SwipeableViews>
    </div>
  )
}
