import IAuthState from './auth/IAuthState'
import IEventState from './event/IEventState'
import IInviteState from './invite/IInviteState'
import IPlaylistState from './playlist/IPlaylistState'
import IRecommendationsState from './recommendation/IRecommendationsState'
import IRsvpState from './rsvp/IRsvpState'
import ISearchState from './search/ISearchState'
import ISuggestionState from './suggestion/ISuggestionState'
import IUserState from './user/IUserState'
import IVoteState from './vote/IVoteState'

export default interface IRootState {
  auth: IAuthState
  event: IEventState
  invite: IInviteState
  playlist: IPlaylistState
  recommendation: IRecommendationsState
  search: ISearchState
  suggestion: ISuggestionState
  user: IUserState
  rsvp: IRsvpState
  vote: IVoteState
}
