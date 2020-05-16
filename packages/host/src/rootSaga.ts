import { all } from 'redux-saga/effects'
import { watchLogin, watchLogout } from 'auth/authSaga'
import {
  watchMoveItemInEventPlaylist,
  watchSortPlaylistByVotesDescending,
  watchFetchEvents,
  watchDeleteEvent,
  watchFetchEventById
} from 'event/eventSaga'
import {
  watchFetchMorePlaylistsFlow,
  watchFetchPlaylistEditDetails,
  watchFetchPlaylists,
  watchFetchSearchTracks
} from 'playlist/playlistSaga'
import { watchFetchRecommendation } from 'recommendation/recommendationSaga'
import { watchFetchSuggestions } from 'request/requestSaga'
import { watchUpdateUserFlow } from 'user/userSaga'
import { watchFetchEventVotes } from 'mm-shared'

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchLogout(),
    watchFetchPlaylists(),
    watchFetchEventById(),
    watchFetchEvents(),
    watchDeleteEvent(),
    watchFetchSuggestions(),
    watchFetchEventVotes(),
    watchMoveItemInEventPlaylist(),
    watchSortPlaylistByVotesDescending(),
    watchUpdateUserFlow(),
    watchFetchSearchTracks(),
    watchFetchRecommendation(),
    watchFetchMorePlaylistsFlow(),
    watchFetchPlaylistEditDetails()
  ])
}
