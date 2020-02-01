import { Track, User } from '..'
import { Suggestion } from './Suggestion'

export interface DecoratedSuggestion {
  suggestion: Suggestion
  track: Track
  user: User
}
