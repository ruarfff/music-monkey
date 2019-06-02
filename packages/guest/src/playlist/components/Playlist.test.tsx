import React from 'react'
import { shallow } from 'enzyme'
import Playlist from './Playlist'
import IPlaylist from '../IPlaylist'
import ITrackVoteStatus from '../../vote/ITrackVoteStatus'
import ITrack from '../../track/ITrack'
import IEvent from '../../event/IEvent'
import IUser from '../../user/IUser'

it('renders without crashing', () => {
  const user = {} as IUser
  const event = {} as IEvent
  const selectedPlaylist = {} as IPlaylist
  const votes = {} as Map<string, ITrackVoteStatus>
  const selectedTrack = {} as ITrack
  const fetchingVotes = false

  const fetchEventVotes = jest.fn()
  const createVote = jest.fn()
  const deleteVote = jest.fn()
  const selectTrack = jest.fn()
  const deselectTrack = jest.fn()
  const getSuggestions = jest.fn()
  const setEventId = jest.fn()

  shallow(
    <Playlist
      user={user}
      event={event}
      selectedPlaylist={selectedPlaylist}
      votes={votes}
      selectedTrack={selectedTrack}
      fetchingVotes={fetchingVotes}
      fetchEventVotes={fetchEventVotes}
      createVote={createVote}
      deleteVote={deleteVote}
      selectTrack={selectTrack}
      deselectTrack={deselectTrack}
      getSuggestions={getSuggestions}
      setEventId={setEventId}
      history={{} as any}
      location={{} as any}
      match={{ params: {} } as any}
    />
  )
})
