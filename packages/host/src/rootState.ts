import IAuthState from './auth/IAuthState'
import IEventState from './event/IEventState'
import IEventPlaylistState from './event/eventPlaylist/IEventPlaylistState'
import IEventViewState from './event/eventView/IEventViewState'
import { IInsightsInitialState } from './insights/insightsInitialState'
import IPlaylistState from './playlist/IPlaylistState'
import IRecommendationsState from './recommendations/IRecommendationState'
import ISuggestionState from './suggestion/ISuggestionState'
import IUserState from './user/IUserState'
import IVoteState from './vote/IVoteState'

export default interface IRootState {
  auth: IAuthState
  user: IUserState
  playlist: IPlaylistState
  event: IEventState
  eventView: IEventViewState
  eventPlaylist: IEventPlaylistState
  suggestion: ISuggestionState
  vote: IVoteState
  insights: IInsightsInitialState

  recommendation: IRecommendationsState
}
