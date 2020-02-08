import { Action, DecoratedSuggestion } from 'mm-shared'
import ISuggestionState from './RequestState'
import {
  FETCH_SUGGESTIONS_FAILED,
  FETCH_SUGGESTIONS_INITIATED,
  FETCH_SUGGESTIONS_SUCCESS,
  SAVE_PLAYLIST_SUGGESTION_INITIATED,
  SAVE_SUGGESTION_FAILED,
  SAVE_SUGGESTION_SUCCESS,
  SAVE_TRACK_SUGGESTION_INITIATED
} from './requestActions'
import initialState from './requestInitialState'

export default function suggestion(
  state: ISuggestionState = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case SAVE_TRACK_SUGGESTION_INITIATED:
      return { ...state, savingRequests: true } as ISuggestionState
    case SAVE_PLAYLIST_SUGGESTION_INITIATED:
      return { ...state, savingRequests: true } as ISuggestionState
    case SAVE_SUGGESTION_SUCCESS:
      return {
        ...state,
        savingRequests: false,
        savedRequest: payload
      } as ISuggestionState
    case SAVE_SUGGESTION_FAILED:
      return {
        ...state,
        savingRequests: false,
        savingRequestsError: payload
      } as ISuggestionState
    case FETCH_SUGGESTIONS_INITIATED:
      return { ...state, fetchingRequests: true } as ISuggestionState
    case FETCH_SUGGESTIONS_SUCCESS: {
      const suggestions = [...payload]

      const pendingSuggestions = suggestions.filter(
        (s: DecoratedSuggestion) =>
          !s.suggestion.accepted && !s.suggestion.rejected
      )

      const rejectedSuggestions = suggestions.filter(
        (s: DecoratedSuggestion) => s.suggestion.rejected
      )

      const acceptedSuggestions = suggestions.filter(
        (s: DecoratedSuggestion) => s.suggestion.accepted
      )

      return {
        ...state,
        requests: suggestions,
        fetchingRequests: false,
        pendingRequests: pendingSuggestions,
        rejectedRequests: rejectedSuggestions,
        acceptedRequests: acceptedSuggestions
      } as ISuggestionState
    }
    case FETCH_SUGGESTIONS_FAILED:
      return {
        ...state,
        fetchingRequests: false,
        fetchingRequestsError: payload
      } as ISuggestionState

    default:
      return state
  }
}
