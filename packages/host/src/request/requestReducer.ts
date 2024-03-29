import { Action, DecoratedSuggestion } from 'mm-shared'
import SuggestionState from './RequestState'
import {
  FETCH_REQUESTS_FAILED,
  FETCH_REQUESTS_INITIATED,
  FETCH_REQUESTS_SUCCESS
} from './requestActions'
import initialState from './requestInitialState'

export default function suggestion(
  state: SuggestionState = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case FETCH_REQUESTS_INITIATED:
      return { ...state, fetchingSuggestions: true } as SuggestionState
    case FETCH_REQUESTS_SUCCESS: {
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
        fetchingSuggestions: false,
        pendingRequests: pendingSuggestions,
        rejectedRequests: rejectedSuggestions,
        acceptedRequests: acceptedSuggestions
      } as SuggestionState
    }
    case FETCH_REQUESTS_FAILED:
      return {
        ...state,
        fetchingSuggestions: false,
        fetchingSuggestionsError: payload
      } as SuggestionState

    default:
      return state
  }
}
