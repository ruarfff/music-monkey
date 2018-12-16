import IEvent from '../event/IEvent'
import IAction from '../IAction'
import IInvite from './IInvite'
import {
  CLEAR_INVITE_SUCCESS,
  FETCHING_INVITE_ERROR,
  FETCHING_INVITE_SUCCESS,
  INVITE_ID_LOADED
} from './inviteActions'
import initialState from './inviteInitialState'
import invite from './inviteReducer'

it('should return the initial state when no action matches', () => {
  expect(invite(undefined, {} as IAction)).toEqual(initialState)
})

it('should handle INVITE_ID_LOADED', () => {
  const inviteId = 'invite-id'
  expect(
    invite(initialState, { type: INVITE_ID_LOADED, payload: inviteId })
  ).toEqual({
    ...initialState,
    inviteId
  })
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
    event: {} as IEvent
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

it('should handle CLEAR_INVITE_SUCCESS', () => {
  expect(
    invite(
      {
        ...initialState,
        inviteId: 'some-id',
        event: { eventId: 'event-id' } as IEvent
      },
      {
        type: CLEAR_INVITE_SUCCESS
      }
    )
  ).toEqual(initialState)
})
