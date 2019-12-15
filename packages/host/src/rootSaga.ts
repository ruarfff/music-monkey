import { all } from 'redux-saga/effects'
import { watchLogin, watchLogout } from 'auth/authSaga'
import {
  watchCreateEvent,
  watchCreateEventPlaylist,
  watchEventPlaylistCreated,
  watchFetchEvents,
  watchUpdateEvent,
  watchUpdateLocationAutoComplete
} from 'event/eventSaga'
import {
  watchMoveItemInEventPlaylist,
  watchSaveEventPlaylist,
  watchSortPlaylistByVotesDescending
} from 'event/eventPlaylist/eventPlaylistSaga'
import {
  watchDeleteEvent,
  watchFetchEventById,
  watchFetchEventByIdNoLoading,
  watchRefreshEventPlaylist,
  watchToggleAutoAcceptSuggestions,
  watchToggleDynamicVoting,
  watchToggleSuggestingPlaylists
} from 'event/eventViewSaga'
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
    watchCreateEvent(),
    watchUpdateLocationAutoComplete(),
    watchCreateEventPlaylist(),
    watchFetchEventById(),
    watchEventPlaylistCreated(),
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
    watchUpdateEvent(),
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
