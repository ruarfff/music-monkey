import { Track, User } from 'mm-shared'
import ISuggestion from './ISuggestion'

export default interface IDecoratedSuggestion {
  suggestion: ISuggestion
  track: Track
  user: User
}
