import React from 'react'
import { shallow } from 'enzyme'
import Playlist from './Playlist'
import ITrackVoteStatus from '../../vote/ITrackVoteStatus'
import IEvent from '../../event/IEvent'
import IUser from '../../user/IUser'

it('renders without crashing', () => {
  const user = {} as IUser
  const event = {} as IEvent
  const votes = new Map<string, ITrackVoteStatus>()
  const fetchingVotes = false
  const fetchEventVotes = jest.fn()
  const createVote = jest.fn()
  const deleteVote = jest.fn()
  const getSuggestions = jest.fn()
  const setEventId = jest.fn()

  shallow(
    <Playlist
      user={user}
      event={event}
      votes={votes}
      fetchingVotes={fetchingVotes}
      fetchEventVotes={fetchEventVotes}
      createVote={createVote}
      deleteVote={deleteVote}
      getSuggestions={getSuggestions}
      setEventId={setEventId}
      history={{} as any}
      location={{} as any}
      match={{ params: {} } as any}
    />
  )
})
