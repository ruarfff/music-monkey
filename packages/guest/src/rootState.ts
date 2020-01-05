import IAuthState from './auth/IAuthState'
import IEventState from './event/IEventState'
import IInviteState from './invite/IInviteState'
import IPlaylistState from './playlist/IPlaylistState'
import IRecommendationsState from './recommendations/IRecommendationsState'
import IRsvpState from './rsvp/IRsvpState'
import ISearchState from './search/ISearchState'
import ISuggestionState from './requests/ISuggestionState'
import IUserState from './user/IUserState'
import { VoteState } from 'mm-shared'

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
  vote: VoteState
}
