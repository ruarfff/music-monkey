// import { isEmpty } from 'lodash'
import * as React from 'react'
import IAction from '../../IAction'
import ITrack from '../../track/ITrack'
import TrackList from '../../track/TrackList'
import IUser from '../../user/IUser'
import ITrackVoteStatus from '../../vote/ITrackVoteStatus'
import IVote from '../../vote/IVote'
import IEvent from '../IEvent'
import './EventDetails.scss'

interface IEventDetailsProps {
  event: IEvent
  user: IUser
  votes: Map<string, ITrackVoteStatus>
  createVote(vote: IVote): IAction
  deleteVote(voteId: string): IAction
  fetchEventVotes(eventId: string): IAction
}

class EventDetails extends React.PureComponent<IEventDetailsProps> {

  public handleTrackVote = (track: ITrack) => {
    const trackId = track.uri
    const { user, votes, event } = this.props
    const eventId = !!event ? event.eventId : ''

    if (votes && votes.has(trackId)) {
      const voteStatus = votes.get(trackId)
      if (voteStatus && voteStatus.votedByCurrentUser) {
        this.props.deleteVote(`${trackId}:${eventId}:${user.userId}`)
        setTimeout(
          () =>
            this.props.event &&
            this.props.fetchEventVotes(this.props.event.eventId),
          300
        )
        return
      }
    }

    const vote = {
      eventId,
      trackId,
      userId: user.userId
    } as IVote
    this.props.createVote(vote)
    setTimeout(
      () =>
        this.props.event &&
        this.props.fetchEventVotes(this.props.event.eventId),
      300
    )
  }

  public render() {
    const { event } = this.props

    return (
      <div className="EventDetails-root">
        <div className="EventDetails-playlist-description">
          <div className="EventDetails-playlist-info">
            <span className="EventDetails-playlist-title">
              Playlist Name
            </span><br/>
            <span>
              {event.playlist.name}
            </span>
            <br/>
            {event.playlist.description !== '' && (
              <>
                <span className="EventDetails-playlist-title">
                  Playlist Description
                </span><br/>
                <span>
                {event.playlist.description}
                </span>
              </>
            )}
          </div>

          {!event.genre &&
            <div className="EventDetails-playlist-genre">
              <span className="EventDetails-playlist-title">
                  Genre
              </span><br/>
              {event.genre}test
            </div>
          }
        </div>
        <div>
          <TrackList
            tracks={event.playlist.tracks.items.map((item) =>
              item.track
            )}
            withVoting={true}
            votes={this.props.votes}
            onVote={this.handleTrackVote}
          />
        </div>
      </div>
    )
  }
}



export default EventDetails
