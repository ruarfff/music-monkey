import { DecoratedSuggestion } from 'mm-shared'

export default interface ISuggestionState {
  requests: DecoratedSuggestion[]
  acceptedRequests: DecoratedSuggestion[]
  pendingRequests: DecoratedSuggestion[]
  rejectedRequests: DecoratedSuggestion[]
  fetchingRequests: boolean
  savingRequests: boolean
  fetchingRequestsError?: Error
  savingRequestsError?: Error
}
