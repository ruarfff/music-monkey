import React from 'react'
import { shallow } from 'enzyme'
import ApproveTracks from './ApprovedTracks'
import IPlaylist from '../IPlaylist'
import ITrackVoteStatus from '../../vote/ITrackVoteStatus'
import ITrack from '../../track/ITrack'

it('renders without crashing', () => {
  const playlist = {} as IPlaylist
  const votes = {} as Map<string, ITrackVoteStatus>
  const onTrackSelected = (track: ITrack) => {}
  const onVote = (track: ITrack) => {}
  shallow(
    <ApproveTracks
      playlist={playlist}
      votes={votes}
      onTrackSelected={onTrackSelected}
      onVote={onVote}
    />
  )
})
