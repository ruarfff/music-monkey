import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import auth from './auth/authReducer'
import event from './event/eventReducer'
import invite from './invite/inviteReducer'
import playlist from './playlist/playlistReducer'
import recommendation from './recommendation/recommendationReducer'
import suggestion from './request/requestReducer'
import user from './user/userReducer'
import { voteReducer as vote } from 'mm-shared'
import rsvp from './rsvp/rsvpReducer'

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    event,
    invite,
    playlist,
    recommendation,
    rsvp,
    suggestion,
    user,
    vote
  })
