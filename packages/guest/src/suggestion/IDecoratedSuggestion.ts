import ITrack from '../track/ITrack'
import ISuggestion from './ISuggestion'

export default interface IDecoratedSuggestion {
  suggestion: ISuggestion
  track: ITrack
}
