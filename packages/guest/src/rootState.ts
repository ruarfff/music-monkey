import IAuthState from './auth/IAuthState'
import IEventState from './event/IEventState'
import IInviteState from './invite/IInviteState'
import IPlaylistState from './playlist/IPlaylistState'
import RecommendationState from './recommendation/RecommendationState'
import IRsvpState from './rsvp/IRsvpState'
import ISuggestionState from './request/RequestState'
import IUserState from './user/IUserState'
import MusicState from 'music/MusicState'
import { VoteState } from 'mm-shared'

export default interface IRootState {
  auth: IAuthState
  event: IEventState
  invite: IInviteState
  playlist: IPlaylistState
  recommendation: RecommendationState
  suggestion: ISuggestionState
  user: IUserState
  rsvp: IRsvpState
  vote: VoteState,
    music: MusicState
}
