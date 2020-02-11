import IAuthState from 'auth/IAuthState'
import IEventState from 'event/IEventState'
import IPlaylistState from 'playlist/IPlaylistState'
import IRecommendationsState from 'recommendation/IRecommendationState'
import ISuggestionState from 'request/RequestState'
import IUserState from 'user/IUserState'
import MusicState from 'music/MusicState'
import { VoteState } from 'mm-shared'

export default interface IRootState {
  auth: IAuthState
  user: IUserState
  playlist: IPlaylistState
  event: IEventState
  suggestion: ISuggestionState
  vote: VoteState
  recommendation: IRecommendationsState
  music: MusicState
}
