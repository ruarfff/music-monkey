import React from 'react'
import { isEmpty } from 'lodash'
import { Action, Event, Track, User, TrackVoteStatus, Vote } from 'mm-shared'
import TrackList from 'track/TrackList'
import './EventDetails.scss'

interface IEventDetailsProps {
  event: Event
  user: User
  votes: Map<string, TrackVoteStatus>
  createVote(vote: Vote): Action
  deleteVote(voteId: string): Action
}

class EventDetails extends React.PureComponent<IEventDetailsProps> {
  public handleTrackVote = (track: Track) => {
    const trackId = track.uri
    const { user, votes, event } = this.props
    const eventId = !!event ? event.eventId : ''

    if (votes && votes.has(trackId)) {
      const voteStatus = votes.get(trackId)
      if (voteStatus && voteStatus.votedByCurrentUser) {
        this.props.deleteVote(`${trackId}:${eventId}:${user.userId}`)
        return
      }
    }

    const vote = {
      eventId,
      trackId,
      userId: user.userId
    } as Vote
    this.props.createVote(vote)
  }

  public render() {
    const { event } = this.props

    return (
      <div className="EventDetails-root">
        <div className="EventDetails-playlist-description">
          <div className="EventDetails-playlist-info">
            <span className="EventDetails-playlist-title">Playlist Name</span>
            <br />
            <span>{!isEmpty(event.playlist) && event.playlist!.name}</span>
            <br />
            {!isEmpty(event.playlist) && event.playlist!.description !== '' && (
              <>
                <span className="EventDetails-playlist-title">
                  Playlist Description
                </span>
                <br />
                <span>{event.playlist!.description}</span>
              </>
            )}
          </div>

          {event.genre && (
            <div className="EventDetails-playlist-genre">
              <span className="EventDetails-playlist-title">Genre</span>
              <br />
              {event.genre}
            </div>
          )}
        </div>
        <div>
          {!isEmpty(event.playlist) && (
            <TrackList
              tracks={event.playlist!.tracks.items.map(item => item.track)}
              withVoting={true}
              votes={this.props.votes}
              onVote={this.handleTrackVote}
            />
          )}
        </div>
      </div>
    )
  }
}

export default EventDetails
