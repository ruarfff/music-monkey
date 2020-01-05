import IDecoratedSuggestion from './IDecoratedSuggestion'
import ISuggestionState from './ISuggestionState'

export default {
  suggestions: [] as IDecoratedSuggestion[],
  deletingSuggestion: false,
  fetchingSuggestions: false,
  savingSuggestion: false,
  deletingSuggestionError: undefined,
  fetchingSuggestionsError: undefined,
  savingSuggestionError: undefined
} as ISuggestionState
