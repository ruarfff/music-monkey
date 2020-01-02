import ISuggestion from '../suggestion/ISuggestion'
import { Track } from 'mm-shared'
import IUser from '../user/IUser'

export default interface IDecoratedSuggestion {
  user: IUser
  suggestion: ISuggestion
  track: Track
}
