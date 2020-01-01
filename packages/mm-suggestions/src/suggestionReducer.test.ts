import IAction from '../IAction'
import ITrackSuggestion from './IPlaylistSuggestion'
import IPlaylistSuggestion from './IPlaylistSuggestion'
import ISuggestion from './ISuggestion'
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
} from './suggestionActions'
import initialState from './suggestionInitialState'
import suggestion from './suggestionReducer'

describe('suggestionReducer', () => {
  it('should return the initial state when no action matches', () => {
    expect(suggestion(undefined, {} as IAction)).toEqual(initialState)
  })

  it('should handle SAVE_TRACK_SUGGESTION_INITIATED', () => {
    expect(
      suggestion(initialState, {
        type: SAVE_TRACK_SUGGESTION_INITIATED,
        payload: {} as ITrackSuggestion
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
        payload: {} as IPlaylistSuggestion
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
          payload: {} as ISuggestion
        }
      )
    ).toEqual({
      ...initialState,
      savingSuggestion: false,
      savedSuggestion: {} as ISuggestion
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
        { type: FETCH_SUGGESTIONS_SUCCESS, payload: [] as ISuggestion[] }
      )
    ).toEqual({
      ...initialState,
      fetchingSuggestions: false,
      suggestions: [] as ISuggestion[]
    })
  })

  it('should handle CLEAR_SAVED_SUGGESTION', () => {
    expect(
      suggestion(
        { ...initialState, savedSuggestion: {} as ISuggestion },
        { type: CLEAR_SAVED_SUGGESTION }
      )
    ).toEqual({ ...initialState, savedSuggestion: undefined })
  })

  it('should handle DELETE_SUGGESTION_INITIATED', () => {
    expect(
      suggestion(initialState, {
        type: DELETE_SUGGESTION_INITIATED,
        payload: {} as ISuggestion
      })
    ).toEqual({ ...initialState, deletingSuggestion: true })
  })

  it('should handle DELETE_SUGGESTION_SUCCESS', () => {
    expect(
      suggestion(
        { ...initialState, deletingSuggestion: true },
        { type: DELETE_SUGGESTION_SUCCESS, payload: {} as ISuggestion }
      )
    ).toEqual({
      ...initialState,
      deletingSuggestion: false,
      deletedSuggestion: {} as ISuggestion
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
