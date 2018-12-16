import IDecoratedSuggestion from './IDecoratedSuggestion'
import ISuggestionState from './ISuggestionState'

export default {
  acceptedSuggestions: [] as IDecoratedSuggestion[],
  pendingSuggestions: [] as IDecoratedSuggestion[],
  rejectedSuggestions: [] as IDecoratedSuggestion[],
  stagedSuggestions: [] as IDecoratedSuggestion[],
  deletingSuggestion: false,
  fetchingSuggestions: false,
  savingSuggestion: false,
  deletingSuggestionError: undefined,
  fetchingSuggestionsError: undefined,
  savingSuggestionError: undefined
} as ISuggestionState
