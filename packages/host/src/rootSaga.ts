import { all } from 'redux-saga/effects'
import { watchLogin, watchLogout } from 'auth/authSaga'
import {
  watchMoveItemInEventPlaylist,
  watchSortPlaylistByVotesDescending,
  watchFetchEvents,
  watchDeleteEvent,
  watchFetchEventById,
  watchFetchEventByIdNoLoading,
  watchToggleAutoAcceptSuggestions,
  watchToggleDynamicVoting,
  watchToggleSuggestingPlaylists
} from 'event/eventSaga'
import {
  watchFetchAddTrackToPlaylist,
  watchFetchMorePlaylistsFlow,
  watchFetchPlaylistEditDetails,
  watchFetchPlaylists,
  watchFetchRemoveTrackFromPlaylist,
  watchFetchSearchTracks,
  watchFetchTrackFeatures
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
    watchToggleDynamicVoting(),
    watchFetchEventByIdNoLoading(),
    watchToggleAutoAcceptSuggestions(),
    watchToggleSuggestingPlaylists(),
    watchUpdateUserFlow(),
    watchFetchRemoveTrackFromPlaylist(),
    watchFetchSearchTracks(),
    watchFetchAddTrackToPlaylist(),
    watchFetchTrackFeatures(),
    watchFetchRecommendation(),
    watchFetchMorePlaylistsFlow(),
    watchFetchPlaylistEditDetails()
  ])
}
