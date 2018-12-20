import { all } from 'redux-saga/effects'
import {
  watchLogin,
  watchLoginAsGuest,
  watchLoginWithPassword,
  watchLogout,
  watchSignUp
} from './auth/authSaga'
import {
  watchFetchEvent,
  watchFetchEventByInviteId,
  watchFetchEventHostByIdFlow,
  watchFetchUsersEvents
} from './event/eventSaga'
import {
  watchClearInvite,
  watchFetchInvite,
  watchLoadInviteId,
  watchStoreInviteId
} from './invite/inviteSaga'
import { watchFetchPlaylists } from './playlist/playlistSaga'
import { watchFetchRecommendation } from './recommendation/recommendationsSaga'
import { watchFetchOrCreateRsvp, watchFetchUpdateRsvp } from './rsvp/rsvpSaga'
import { watchSearch } from './search/searchSaga'
import {
  watchFetchSuggestions,
  watchFetchUsersSuggestions,
  watchSavePlaylistSuggestion,
  watchSaveTrackSuggestion
} from './suggestion/suggestionSaga'
import {
  watchCreateVote,
  watchDeleteVote,
  watchFetchEventVotes
} from './vote/voteSaga'

import { watchSelectPage } from './navigation/activeSaga'
import { watchUpdateUserFlow } from './user/userSaga'

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchSelectPage(),
    watchFetchPlaylists(),
    watchStoreInviteId(),
    watchLoadInviteId(),
    watchFetchSuggestions(),
    watchFetchUsersSuggestions(),
    watchSaveTrackSuggestion(),
    watchFetchRecommendation(),
    watchSearch(),
    watchFetchEvent(),
    watchFetchEventByInviteId(),
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
    watchClearInvite(),
    watchUpdateUserFlow(),
    watchFetchUpdateRsvp(),
    watchFetchEventHostByIdFlow()
  ])
}
