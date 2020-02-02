import { Action, Suggestion, DecoratedSuggestion } from 'mm-shared'
import {
  FETCH_REQUESTS_FAILED,
  FETCH_REQUESTS_INITIATED,
  FETCH_REQUESTS_SUCCESS,
  REJECT_REQUEST
} from './requestActions'
import initialState from './requestInitialState'
import suggestion from './requestReducer'

describe('suggestionReducer', () => {
  it('should return the initial state when no action matches', () => {
    expect(suggestion(undefined, {} as Action)).toEqual(initialState)
  })

  it('should handle FETCH_REQUESTS_INITIATED', () => {
    expect(
      suggestion(initialState, {
        type: FETCH_REQUESTS_INITIATED
      })
    ).toEqual({
      ...initialState,
      fetchingSuggestions: true
    })
  })

  it('should handle FETCH_REQUESTS_FAILED', () => {
    expect(
      suggestion(
        { ...initialState, fetchingSuggestions: true },
        { type: FETCH_REQUESTS_FAILED, payload: new Error('terrible') }
      )
    ).toEqual({
      ...initialState,
      fetchingSuggestions: false,
      fetchingSuggestionsError: new Error('terrible')
    })
  })

  it('should handle FETCH_REQUESTS_SUCCESS', () => {
    const suggestions = [
      {
        suggestion: { suggestionId: 'pending' } as Suggestion
      } as DecoratedSuggestion,
      {
        suggestion: {
          suggestionId: 'rejected',
          accepted: false,
          rejected: true
        } as Suggestion
      } as DecoratedSuggestion,
      {
        suggestion: {
          suggestionId: 'accepted',
          accepted: true,
          rejected: false
        } as Suggestion
      } as DecoratedSuggestion
    ]

    expect(
      suggestion(
        { ...initialState, fetchingSuggestions: true },
        { type: FETCH_REQUESTS_SUCCESS, payload: suggestions }
      )
    ).toEqual({
      ...initialState,
      fetchingSuggestions: false,
      suggestions,
      pendingSuggestions: [suggestions[0]],
      rejectedSuggestions: [suggestions[1]],
      acceptedSuggestions: [suggestions[2]]
    })
  })

  it('should handle REJECT_REQUEST', () => {
    const suggestionToReject = {
      suggestion: {
        suggestionId: '123',
        accepted: false,
        rejected: false
      } as Suggestion
    } as DecoratedSuggestion
    const pendingSuggestion = {
      suggestion: { suggestionId: 'na' } as Suggestion
    } as DecoratedSuggestion

    expect(
      suggestion(
        {
          ...initialState,
          pendingRequests: [pendingSuggestion, suggestionToReject]
        },
        { type: REJECT_REQUEST, payload: suggestionToReject.suggestion }
      )
    ).toEqual({
      ...initialState,
      pendingSuggestions: [pendingSuggestion],
      rejectedSuggestions: [
        {
          ...suggestionToReject,
          suggestion: { ...suggestionToReject.suggestion, rejected: true }
        }
      ]
    })
  })
})
