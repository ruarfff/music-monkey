import SuggestionState from './RequestState'
import { DecoratedSuggestion } from 'mm-shared'

export default {
  requests: [] as DecoratedSuggestion[],
  acceptedRequests: [] as DecoratedSuggestion[],
  pendingRequests: [] as DecoratedSuggestion[],
  rejectedRequests: [] as DecoratedSuggestion[]
} as SuggestionState
