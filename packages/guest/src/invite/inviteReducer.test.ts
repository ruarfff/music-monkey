import { Action, Event } from 'mm-shared'
import IInvite from './IInvite'
import { FETCHING_INVITE_ERROR, FETCHING_INVITE_SUCCESS } from './inviteActions'
import initialState from './inviteInitialState'
import invite from './inviteReducer'

describe('inviteReducer', () => {
  it('should return the initial state when no action matches', () => {
    expect(invite(undefined, {} as Action)).toEqual(initialState)
  })

  it('should handle FETCHING_INVITE_ERROR ', () => {
    const error = new Error('bad thing happened')
    expect(
      invite(initialState, { type: FETCHING_INVITE_ERROR, payload: error })
    ).toEqual({ ...initialState, error })
  })

  it('should handle FETCHING_INVITE_SUCCESS', () => {
    const fetchedInvite = {
      inviteId: 'invite-id',
      event: {} as Event
    } as IInvite
    expect(
      invite(initialState, {
        type: FETCHING_INVITE_SUCCESS,
        payload: fetchedInvite
      })
    ).toEqual({
      ...initialState,
      inviteId: fetchedInvite.inviteId,
      event: fetchedInvite.event
    })
  })
})
