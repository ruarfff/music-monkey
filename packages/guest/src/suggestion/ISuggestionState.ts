import IDecoratedSuggestion from './IDecoratedSuggestion'
import ISuggestion from './ISuggestion'

export default interface ISuggestionState {
  suggestions: IDecoratedSuggestion[]
  savedSuggestion?: ISuggestion
  deletedSuggestion?: ISuggestion
  deletingSuggestion: boolean
  fetchingSuggestions: boolean
  savingSuggestion: boolean
  deletingSuggestionError?: Error
  fetchingSuggestionsError?: Error
  savingSuggestionError?: Error
}
