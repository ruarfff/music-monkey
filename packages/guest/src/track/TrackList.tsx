import * as React from 'react'
import IEvent from '../event/IEvent'
import ITrack from '../track/ITrack'
import ITrackVoteStatus from '../vote/ITrackVoteStatus'
import TrackListItem from './TrackListItem'

// TODO:  use this: https://codepen.io/dmarcus/pen/vKdWxW
// Also this for styles: https://codepen.io/ArnaudBalland/pen/vGZKLr

interface ITrackListProps {
  tracks: ITrack[]
  withVoting?: boolean
  votes?: Map<string, ITrackVoteStatus>
  onVote?: ((track: ITrack) => void)
  onTrackSelected?: ((track: ITrack) => void)
  withSuggestingEnabled?: boolean
  suggestions?: any
  selectedEvent?: IEvent
}

const TrackList = ({
  selectedEvent = {} as IEvent,
  tracks = [],
  suggestions = [],
  withVoting = false,
  withSuggestingEnabled = false,
  votes = new Map(),
  onVote = (t: ITrack) => undefined,
  onTrackSelected = (t: ITrack) => undefined
}: ITrackListProps) => (
  <React.Fragment>
    {tracks.map((track, i) => {
      const trackId = track.uri
      let numberOfVotes = 0
      let userVoted = false
      if (votes && votes.has(trackId)) {
        const voteStatus: ITrackVoteStatus =
          votes.get(trackId) || ({} as ITrackVoteStatus)
        numberOfVotes = voteStatus.numberOfVotes
        userVoted = voteStatus.votedByCurrentUser
      }

      return (
        <TrackListItem
          key={i}
          track={track}
          withVoting={withVoting}
          currentUserVoted={userVoted}
          numberOfVotes={numberOfVotes}
          onTrackSelected={onTrackSelected}
          onVote={onVote}
          withSuggestingEnabled={withSuggestingEnabled}
        />
      )
    })}
  </React.Fragment>
)

export default TrackList
