import { DecoratedSuggestion } from 'mm-shared'
import ISuggestionState from './RequestState'

export default {
  requests: [] as DecoratedSuggestion[],
  acceptedSuggestions: [] as DecoratedSuggestion[],
  pendingSuggestions: [] as DecoratedSuggestion[],
  rejectedSuggestions: [] as DecoratedSuggestion[],
  stagedSuggestions: [] as DecoratedSuggestion[],
  deletingSuggestion: false,
  fetchingSuggestions: false,
  savingSuggestion: false,
  deletingSuggestionError: undefined,
  fetchingSuggestionsError: undefined,
  savingSuggestionError: undefined
} as ISuggestionState
