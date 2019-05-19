import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import auth from './auth/authReducer'
import event from './event/eventReducer'
import invite from './invite/inviteReducer'
import active from './navigation/activeActionsReducer'
import playlist from './playlist/playlistReducer'
import recommendation from './recommendation/recommendationReducer'
import search from './search/searchReducer'
import suggestion from './suggestion/suggestionReducer'
import track from './track/trackReducer'
import user from './user/userReducer'
import vote from './vote/voteReducer'
import rsvp from './rsvp/rsvpReducer'

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    active,
    auth,
    event,
    invite,
    playlist,
    recommendation,
    rsvp,
    search,
    suggestion,
    track,
    user,
    vote
  })
