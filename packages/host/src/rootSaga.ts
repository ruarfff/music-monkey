import { all } from 'redux-saga/effects'
import { watchLogin, watchLogout } from 'auth/authSaga'
import {
  watchMoveItemInEventPlaylist,
  watchSaveEventPlaylist,
  watchSortPlaylistByVotesDescending,
  watchFetchEvents,
  watchDeleteEvent,
  watchFetchEventById,
  watchFetchEventByIdNoLoading,
  watchRefreshEventPlaylist,
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
import { watchFetchRecommendation } from 'recommendations/recommendationSaga'
import { watchFetchShareEmail } from 'event/shareEvent/shareSaga'
import {
  watchFetchSuggestions,
  watchRejectSuggestion
} from 'suggestion/suggestionSaga'
import { watchUpdateUserFlow } from 'user/userSaga'
import { watchFetchEventVotes } from 'vote/voteSaga'

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchLogout(),
    watchFetchPlaylists(),
    watchFetchEventById(),
    watchFetchEvents(),
    watchDeleteEvent(),
    watchRefreshEventPlaylist(),
    watchFetchSuggestions(),
    watchRejectSuggestion(),
    watchSaveEventPlaylist(),
    watchFetchEventVotes(),
    watchMoveItemInEventPlaylist(),
    watchSortPlaylistByVotesDescending(),
    watchToggleDynamicVoting(),
    watchFetchEventByIdNoLoading(),
    watchToggleAutoAcceptSuggestions(),
    watchToggleSuggestingPlaylists(),
    watchUpdateUserFlow(),
    watchFetchRemoveTrackFromPlaylist(),
    watchFetchShareEmail(),
    watchFetchSearchTracks(),
    watchFetchAddTrackToPlaylist(),
    watchFetchTrackFeatures(),
    watchFetchRecommendation(),
    watchFetchMorePlaylistsFlow(),
    watchFetchPlaylistEditDetails()
  ])
}
