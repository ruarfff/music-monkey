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
import { watchFetchRecommendation } from './recommendations/recommendationsSaga'
import { watchFetchOrCreateRsvp, watchFetchUpdateRsvp } from './rsvp/rsvpSaga'
import { watchSearch } from './search/searchSaga'
import {
  watchFetchSuggestions,
  watchSavePlaylistSuggestion,
  watchSaveTrackSuggestion
} from './suggestion/suggestionSaga'
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
    watchSearch(),
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
