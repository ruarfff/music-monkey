import { Action, Suggestion, TrackRequest, PlaylistRequest } from 'mm-shared'
import {
  FETCH_SUGGESTIONS_FAILED,
  FETCH_SUGGESTIONS_SUCCESS,
  FETCH_SUGGESTIONS_INITIATED,
  SAVE_PLAYLIST_SUGGESTION_INITIATED,
  SAVE_SUGGESTION_FAILED,
  SAVE_SUGGESTION_SUCCESS,
  SAVE_TRACK_SUGGESTION_INITIATED
} from './requestActions'
import initialState from './requestInitialState'
import suggestion from './requestReducer'

describe('requestReducer', () => {
  it('should return the initial state when no action matches', () => {
    expect(suggestion(undefined, {} as Action)).toEqual(initialState)
  })

  it('should handle SAVE_TRACK_SUGGESTION_INITIATED', () => {
    expect(
      suggestion(initialState, {
        type: SAVE_TRACK_SUGGESTION_INITIATED,
        payload: {} as TrackRequest
      })
    ).toEqual({
      ...initialState,
      savingRequests: true
    })
  })

  it('should handle SAVE_TRACK_SUGGESTION_INITIATED', () => {
    expect(
      suggestion(initialState, {
        type: SAVE_PLAYLIST_SUGGESTION_INITIATED,
        payload: {} as PlaylistRequest
      })
    ).toEqual({
      ...initialState,
      savingRequests: true
    })
  })

  it('should handle SAVE_SUGGESTION_SUCCESS', () => {
    expect(
      suggestion(
        { ...initialState, savingRequests: true },
        {
          type: SAVE_SUGGESTION_SUCCESS,
          payload: {} as Suggestion
        }
      )
    ).toEqual({
      ...initialState,
      savingRequests: false,
      savedRequest: {} as Suggestion
    })
  })

  it('should handle SAVE_SUGGESTION_FAILED', () => {
    expect(
      suggestion(
        { ...initialState, savingRequests: true },
        {
          type: SAVE_SUGGESTION_FAILED,
          payload: new Error('hurtrealbad')
        }
      )
    ).toEqual({
      ...initialState,
      savingRequests: false,
      savingRequestsError: new Error('hurtrealbad')
    })
  })

  it('should handle FETCH_SUGGESTIONS_INITIATED', () => {
    expect(
      suggestion(initialState, {
        type: FETCH_SUGGESTIONS_INITIATED
      })
    ).toEqual({
      ...initialState,
      fetchingRequests: true
    })
  })

  it('should handle FETCH_SUGGESTIONS_FAILED', () => {
    expect(
      suggestion(
        { ...initialState, fetchingRequests: true },
        { type: FETCH_SUGGESTIONS_FAILED, payload: new Error('terrible') }
      )
    ).toEqual({
      ...initialState,
      fetchingRequests: false,
      fetchingRequestsError: new Error('terrible')
    })
  })

  it('should handle FETCH_SUGGESTION_SUCCESS', () => {
    expect(
      suggestion(
        { ...initialState },
        { type: FETCH_SUGGESTIONS_SUCCESS, payload: [] as Suggestion[] }
      )
    ).toEqual({
      ...initialState,
      fetchingRequests: false,
      requests: [] as Suggestion[]
    })
  })
})
