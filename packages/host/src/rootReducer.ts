import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import auth from './auth/authReducer'
import event from './event/eventReducer'
import insights from './insights/insightsReducer'
import playlist from './playlist/playlistReducer'
import recommendation from './recommendations/recommendationReducer'
import suggestion from './suggestion/suggestionReducer'
import user from './user/userReducer'
import vote from './vote/voteReducer'

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    event,
    playlist,
    suggestion,
    user,
    vote,
    insights,
    recommendation
  })
