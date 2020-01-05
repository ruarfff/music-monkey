import ISuggestion from './ISuggestion'
import { Track } from 'mm-shared'
import { User } from 'mm-shared'

export default interface IDecoratedSuggestion {
  user: User
  suggestion: ISuggestion
  track: Track
}
