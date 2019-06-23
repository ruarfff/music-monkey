import React from 'react'
import { shallow } from 'enzyme'
import PlaylistPlayer from './PlaylistPlayer'
import ITrack from '../../track/ITrack'
import ITrackVoteStatus from '../../vote/ITrackVoteStatus'

it('renders without crashing', () => {
  const tracks = [] as ITrack[]
  const selectedTrack = {} as ITrack
  const selectedTrackVotes = {} as ITrackVoteStatus
  const onFavouriteClicked = jest.fn()
  const onTrackChanged = jest.fn()
  const deselectEvent = jest.fn()

  shallow(
    <PlaylistPlayer
      tracks={tracks}
      selectedTrack={selectedTrack}
      selectedTrackVotes={selectedTrackVotes}
      onFavouriteClicked={onFavouriteClicked}
      onTrackChanged={onTrackChanged}
      deselectEvent={deselectEvent}
    />
  )
})
