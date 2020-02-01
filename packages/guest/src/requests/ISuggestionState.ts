import { DecoratedSuggestion, Suggestion } from 'mm-shared'

export default interface ISuggestionState {
  suggestions: DecoratedSuggestion[]
  acceptedSuggestions: DecoratedSuggestion[]
  pendingSuggestions: DecoratedSuggestion[]
  rejectedSuggestions: DecoratedSuggestion[]
  stagedSuggestions: DecoratedSuggestion[]
  savedSuggestion?: Suggestion
  deletedSuggestion?: Suggestion
  deletingSuggestion: boolean
  fetchingSuggestions: boolean
  savingSuggestion: boolean
  deletingSuggestionError?: Error
  fetchingSuggestionsError?: Error
  savingSuggestionError?: Error
}
