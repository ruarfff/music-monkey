import { Action } from 'mm-shared'
import { Track }  from 'mm-shared'
import { SEARCH_SUCCESS } from './searchActions'
import initialState from './searchInitialState'
import search from './searchReducer'

it('should return the initial state when no action matches', () => {
  expect(search(undefined, {} as Action)).toEqual(initialState)
})

it('should handle SEARCH_SUCCESS', () => {
  expect(
    search(initialState, { type: SEARCH_SUCCESS, payload: [{} as Track] })
  ).toEqual({
    ...initialState,
    tracks: [{} as Track]
  })
})
