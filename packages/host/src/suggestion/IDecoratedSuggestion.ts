import ISuggestion from '../suggestion/ISuggestion'
import ITrack from '../track/ITrack'
import IUser from '../user/IUser'

export default interface IDecoratedSuggestion {
  user: IUser
  suggestion: ISuggestion
  track: ITrack
}
