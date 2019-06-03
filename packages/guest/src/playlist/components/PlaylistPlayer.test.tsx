import React from 'react'
import { shallow } from 'enzyme'
import PlaylistPlayer from './PlaylistPlayer'
import IPlaylist from '../IPlaylist'
import ITrack from '../../track/ITrack'
import ITrackVoteStatus from '../../vote/ITrackVoteStatus'

it('renders without crashing', () => {
  const playlist = {} as IPlaylist
  const selectedTrack = {} as ITrack
  const votes = new Map<string, ITrackVoteStatus>()
  const handleTrackVote = jest.fn()

  shallow(
    <PlaylistPlayer
      playlist={playlist}
      selectedTrack={selectedTrack}
      votes={votes}
      handleTrackVote={handleTrackVote}
    />
  )
})
