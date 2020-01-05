import IAuthState from './auth/IAuthState'
import IEventState from './event/IEventState'
import { IInsightsInitialState } from './insights/insightsInitialState'
import IPlaylistState from './playlist/IPlaylistState'
import IRecommendationsState from './recommendations/IRecommendationState'
import ISuggestionState from './suggestion/ISuggestionState'
import IUserState from './user/IUserState'
import { VoteState } from 'mm-shared'

export default interface IRootState {
  auth: IAuthState
  user: IUserState
  playlist: IPlaylistState
  event: IEventState
  suggestion: ISuggestionState
  vote: VoteState
  insights: IInsightsInitialState
  recommendation: IRecommendationsState
}
