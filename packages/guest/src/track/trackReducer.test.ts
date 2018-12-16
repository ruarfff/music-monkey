import IAction from '../IAction'
import ITrack from './ITrack'
import { TRACK_DESELECTED, TRACK_SELECTED } from './trackActions'
import initialState from './trackInitialState'
import track from './trackReducer'

it('should return the initial state when no action matches', () => {
  expect(track(undefined, {} as IAction)).toEqual(initialState)
})

it('should handle TRACK_SELECTED', () => {
  expect(
    track(initialState, { type: TRACK_SELECTED, payload: {} as ITrack })
  ).toEqual({
    ...initialState,
    selectedTrack: {} as ITrack
  })
})

it('should handle TRACK_DESELECTED', () => {
  expect(
    track(
      { ...initialState, selectedTrack: {} as ITrack },
      { type: TRACK_DESELECTED }
    )
  ).toEqual({
    ...initialState
  })
})
