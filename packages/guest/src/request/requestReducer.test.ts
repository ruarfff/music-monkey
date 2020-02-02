import { Action, Suggestion, TrackRequest, PlaylistRequest } from 'mm-shared'
import {
  CLEAR_SAVED_SUGGESTION,
  DELETE_SUGGESTION_FAILED,
  DELETE_SUGGESTION_INITIATED,
  DELETE_SUGGESTION_SUCCESS,
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

describe('suggestionReducer', () => {
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
      savingSuggestion: true
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
      savingSuggestion: true
    })
  })

  it('should handle SAVE_SUGGESTION_SUCCESS', () => {
    expect(
      suggestion(
        { ...initialState, savingSuggestion: true },
        {
          type: SAVE_SUGGESTION_SUCCESS,
          payload: {} as Suggestion
        }
      )
    ).toEqual({
      ...initialState,
      savingSuggestion: false,
      savedSuggestion: {} as Suggestion
    })
  })

  it('should handle SAVE_SUGGESTION_FAILED', () => {
    expect(
      suggestion(
        { ...initialState, savingSuggestion: true },
        {
          type: SAVE_SUGGESTION_FAILED,
          payload: new Error('hurtrealbad')
        }
      )
    ).toEqual({
      ...initialState,
      savingSuggestion: false,
      savingSuggestionError: new Error('hurtrealbad')
    })
  })

  it('should handle FETCH_SUGGESTIONS_INITIATED', () => {
    expect(
      suggestion(initialState, {
        type: FETCH_SUGGESTIONS_INITIATED
      })
    ).toEqual({
      ...initialState,
      fetchingSuggestions: true
    })
  })

  it('should handle FETCH_SUGGESTIONS_FAILED', () => {
    expect(
      suggestion(
        { ...initialState, fetchingSuggestions: true },
        { type: FETCH_SUGGESTIONS_FAILED, payload: new Error('terrible') }
      )
    ).toEqual({
      ...initialState,
      fetchingSuggestions: false,
      fetchingSuggestionsError: new Error('terrible')
    })
  })

  it('should handle FETCH_SUGGESTION_SUCCESS', () => {
    expect(
      suggestion(
        { ...initialState, fetchingSuggestions: true },
        { type: FETCH_SUGGESTIONS_SUCCESS, payload: [] as Suggestion[] }
      )
    ).toEqual({
      ...initialState,
      fetchingSuggestions: false,
      suggestions: [] as Suggestion[]
    })
  })

  it('should handle CLEAR_SAVED_SUGGESTION', () => {
    expect(
      suggestion(
        { ...initialState, savedSuggestion: {} as Suggestion },
        { type: CLEAR_SAVED_SUGGESTION }
      )
    ).toEqual({ ...initialState, savedSuggestion: undefined })
  })

  it('should handle DELETE_SUGGESTION_INITIATED', () => {
    expect(
      suggestion(initialState, {
        type: DELETE_SUGGESTION_INITIATED,
        payload: {} as Suggestion
      })
    ).toEqual({ ...initialState, deletingSuggestion: true })
  })

  it('should handle DELETE_SUGGESTION_SUCCESS', () => {
    expect(
      suggestion(
        { ...initialState, deletingSuggestion: true },
        { type: DELETE_SUGGESTION_SUCCESS, payload: {} as Suggestion }
      )
    ).toEqual({
      ...initialState,
      deletingSuggestion: false,
      deletedSuggestion: {} as Suggestion
    })
  })

  it('should handle DELETE_SUGGESTION_FAILED', () => {
    expect(
      suggestion(
        { ...initialState, deletingSuggestion: true },
        { type: DELETE_SUGGESTION_FAILED, payload: new Error('balls') }
      )
    ).toEqual({ ...initialState, deletingSuggestionError: new Error('balls') })
  })
})
