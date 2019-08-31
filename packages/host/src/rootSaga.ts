import { all } from 'redux-saga/effects'
import { watchLogin, watchLogout } from './auth/authSaga'
import {
  watchCreateEvent,
  watchFetchEvents,
  watchUpdateEvent,
  watchUpdateLocationAutoComplete
} from './event/eventSaga'
import {
  watchMoveItemInEventPlaylist,
  watchSaveEventPlaylist,
  watchSortPlaylistByVotesDescending
} from './eventPlaylist/eventPlaylistSaga'
import {
  watchDeleteEvent,
  watchFetchEventById,
  watchFetchEventByIdNoLoading,
  watchRefreshEventPlaylist,
  watchToggleAutoAcceptSuggestions,
  watchToggleDynamicVoting,
  watchToggleSuggestingPlaylists
} from './eventView/eventViewSaga'
import {
  watchFetchNotificationsByUserId,
  watchUpdateNotification
} from './notification/notificationSaga'
import {
  watchFetchAddTrackToPlaylist,
  watchFetchMorePlaylistsFlow,
  watchFetchPlaylistEditDetails,
  watchFetchPlaylists,
  watchFetchRemoveTrackFromPlaylist,
  watchFetchSearchTracks,
  watchFetchTrackFeatures
} from './playlist/playlistSaga'
import { watchFetchRecommendation } from './recommendations/recommendationSaga'
import { watchFetchShareEmail } from './shareEvent/shareSaga'
import {
  watchFetchSuggestions,
  watchRejectSuggestion
} from './suggestion/suggestionSaga'
import { watchUpdateUserFlow } from './user/userSaga'
import { watchFetchEventVotes } from './vote/voteSaga'

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchLogout(),
    watchFetchPlaylists(),
    watchCreateEvent(),
    watchUpdateLocationAutoComplete(),
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
    watchUpdateEvent(),
    watchUpdateUserFlow(),
    watchFetchNotificationsByUserId(),
    watchFetchRemoveTrackFromPlaylist(),
    watchFetchShareEmail(),
    watchFetchSearchTracks(),
    watchFetchAddTrackToPlaylist(),
    watchUpdateNotification(),
    watchFetchTrackFeatures(),
    watchFetchRecommendation(),
    watchFetchMorePlaylistsFlow(),
    watchFetchPlaylistEditDetails()
  ])
}
