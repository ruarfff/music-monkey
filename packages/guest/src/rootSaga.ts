import { all } from 'redux-saga/effects'
import {
  watchLogin,
  watchLoginAsGuest,
  watchLoginWithPassword,
  watchLogout,
  watchSignUp
} from './auth/authSaga'
import { watchFetchEvent, watchFetchUsersEvents } from './event/eventSaga'
import { watchFetchInvite } from './invite/inviteSaga'
import {
  watchFetchMorePlaylistsFlow,
  watchFetchPlaylists
} from './playlist/playlistSaga'
import { watchFetchRecommendation } from './recommendation/recommendationSaga'
import { watchFetchOrCreateRsvp, watchFetchUpdateRsvp } from './rsvp/rsvpSaga'
import {
  watchFetchSuggestions,
  watchSavePlaylistSuggestion,
  watchSaveTrackSuggestion
} from './request/requestSaga'
import {
  watchCreateVote,
  watchDeleteVote,
  watchFetchEventVotes
} from 'mm-shared'
import { watchUpdateUserFlow } from './user/userSaga'

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchFetchPlaylists(),
    watchFetchSuggestions(),
    watchSaveTrackSuggestion(),
    watchFetchRecommendation(),
    watchFetchEvent(),
    watchSavePlaylistSuggestion(),
    watchLogout(),
    watchSignUp(),
    watchLoginWithPassword(),
    watchLoginAsGuest(),
    watchFetchOrCreateRsvp(),
    watchCreateVote(),
    watchDeleteVote(),
    watchFetchEventVotes(),
    watchFetchUsersEvents(),
    watchFetchInvite(),
    watchUpdateUserFlow(),
    watchFetchUpdateRsvp(),
    watchFetchMorePlaylistsFlow()
  ])
}
