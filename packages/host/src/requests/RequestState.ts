import { DecoratedSuggestion } from 'mm-shared'

export default interface SuggestionState {
  requests: DecoratedSuggestion[]
  acceptedRequests: DecoratedSuggestion[]
  pendingRequests: DecoratedSuggestion[]
  rejectedRequests: DecoratedSuggestion[]
  fetchingSuggestions: boolean
  savingSuggestion: boolean
  deletingSuggestionError?: Error
  fetchingSuggestionsError?: Error
  savingSuggestionError?: Error
}
