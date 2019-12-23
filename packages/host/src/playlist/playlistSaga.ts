import { call, put, select, takeEvery } from 'redux-saga/effects'
import { EVENT_FETCH_BY_ID_INITIATED } from '../event/eventViewActions'
import IAction from '../IAction'
import {
  ADD_TRACK_REQUEST,
  addTrackError,
  addTrackSuccess,
  EDIT_PLAYLIST_REQUEST,
  EDIT_PLAYLIST_SUCCESS,
  FETCH_PLAYLISTS,
  FETCH_PLAYLISTS_ERROR,
  FETCH_PLAYLISTS_SUCCESS,
  getTracksFeaturesFailure,
  getTracksFeaturesSuccess,
  LOAD_MORE_PLAYLISTS_FAILURE,
  LOAD_MORE_PLAYLISTS_REQUEST,
  LOAD_MORE_PLAYLISTS_SUCCESS,
  REMOVE_TRACK_REQUEST,
  removeTrackError,
  SEARCH_TRACKS_REQUEST,
  searchTrackFailure,
  searchTrackSuccess,
  TRACK_FEATURES_REQUEST,
  trackRemoved
} from './playlistActions'
import {
  addTracksToPlaylist,
  fetchMoreUsersPlaylists,
  fetchPlaylist,
  fetchUsersPlaylists,
  getTracksFeatures,
  removeTrackFromPlaylist,
  searchForTracks,
  updatePlaylistDetails
} from './playlistClient'

function* fetchPlaylistsFlow(action: IAction) {
  try {
    const playlists = yield call(fetchUsersPlaylists, action.payload)
    yield put({ type: FETCH_PLAYLISTS_SUCCESS, payload: playlists })
  } catch (error) {
    yield put({ type: FETCH_PLAYLISTS_ERROR, payload: error })
  }
}

function* fetchMorePlaylistsFlow(action: IAction) {
  try {
    const playlists = yield call(
      fetchMoreUsersPlaylists,
      action.payload.user,
      action.payload.offset
    )
    yield put({ type: LOAD_MORE_PLAYLISTS_SUCCESS, payload: playlists })
  } catch (error) {
    yield put({ type: LOAD_MORE_PLAYLISTS_FAILURE, payload: error })
  }
}

const getEventPlaylist = (state: any) => state.eventPlaylist.playlist

function* fetchRemoveTrackFromPlaylist(action: IAction) {
  const { playlistId, trackUri, trackPosition } = action.payload
  try {
    const location = yield select(getCurrentLocation)
    const justCreatedPlaylists = yield select(getJustCreatedPlaylists)
    const isReselected: boolean = yield select(getIsReselectedPlaylist)

    const isCreateOrEditPage =
      location.indexOf('create-event') !== -1 || location.indexOf('edit') !== -1

    const isJustCreated =
      justCreatedPlaylists.filter(
        (playlist: any) => playlist.id === action.payload.playlistId
      ).length === 1

    const createPageValidation = isCreateOrEditPage && isJustCreated
    const editPageValidation = isCreateOrEditPage && !isReselected

    let newPlaylist

    if (createPageValidation || editPageValidation) {
      newPlaylist = yield call(
        removeTrackFromPlaylist,
        playlistId,
        trackUri,
        trackPosition
      )
    } else {
      const eventPlaylist = yield select(getEventPlaylist)
      newPlaylist = {
        ...eventPlaylist,
        tracks: {
          ...eventPlaylist.tracks,
          items: eventPlaylist.tracks.items.filter(
            (i: any) => i.track.uri !== trackUri
          )
        }
      }
    }

    if (!isCreateOrEditPage) {
      newPlaylist = yield call(
        removeTrackFromPlaylist,
        playlistId,
        trackUri,
        trackPosition
      )
    }

    yield put(trackRemoved(newPlaylist))
  } catch (error) {
    yield put(removeTrackError())
  }
}

function* fetchSearchedTracks(action: IAction) {
  try {
    const res = yield call(searchForTracks, action.payload)
    yield put(searchTrackSuccess(res))
  } catch (e) {
    yield put(searchTrackFailure(e.message))
  }
}

const getCurrentLocation = (state: any) => state.router.location.pathname
const getJustCreatedPlaylists = (state: any) => state.playlist.createdPlaylists
const getIsReselectedPlaylist = (state: any) => state.event.playlistReselected

function* fetchAddTrackToPlaylist(action: IAction) {
  try {
    const location = yield select(getCurrentLocation)
    const justCreatedPlaylists = yield select(getJustCreatedPlaylists)
    const isReselected: boolean = yield select(getIsReselectedPlaylist)

    const isCreateOrEditPage =
      location.indexOf('create-event') !== -1 || location.indexOf('edit') !== -1

    const isJustCreated =
      justCreatedPlaylists.filter(
        (playlist: any) => playlist.id === action.payload.playlistId
      ).length === 1

    const createPageValidation = isCreateOrEditPage && isJustCreated
    const editPageValidation = isCreateOrEditPage && !isReselected

    if (createPageValidation || editPageValidation) {
      yield call(addTracksToPlaylist, action.payload.playlistId, [
        action.payload.track.uri
      ])
      yield call(fetchPlaylist, action.payload.playlistId)
    }

    if (!isCreateOrEditPage) {
      yield call(addTracksToPlaylist, action.payload.playlistId, [
        action.payload.track.uri
      ])
      yield call(fetchPlaylist, action.payload.playlistId)
    }

    yield put(addTrackSuccess(action.payload.track))
  } catch (e) {
    yield put(addTrackError())
  }
}

function* fetchTracksFeatures({ payload }: IAction) {
  try {
    const tracksWithFeatures = yield call(getTracksFeatures, payload)
    yield put(getTracksFeaturesSuccess(tracksWithFeatures))
  } catch (e) {
    yield put(getTracksFeaturesFailure(e.message))
  }
}

const getEventId = (state: any) => state.eventView.event.eventId

function* fetchPlaylistEditDetails({ payload }: IAction) {
  try {
    const { playlistId, name, description } = payload
    yield call(updatePlaylistDetails, playlistId, name, description)

    const eventId = yield select(getEventId)
    yield put({ type: EDIT_PLAYLIST_SUCCESS })
    yield put({ type: EVENT_FETCH_BY_ID_INITIATED, payload: eventId })
  } catch (e) {
    console.error(e.message)
  }
}

export function* watchFetchMorePlaylistsFlow() {
  yield takeEvery(LOAD_MORE_PLAYLISTS_REQUEST, fetchMorePlaylistsFlow)
}

export function* watchFetchTrackFeatures() {
  yield takeEvery(TRACK_FEATURES_REQUEST, fetchTracksFeatures)
}

export function* watchFetchAddTrackToPlaylist() {
  yield takeEvery(ADD_TRACK_REQUEST, fetchAddTrackToPlaylist)
}

export function* watchFetchSearchTracks() {
  yield takeEvery(SEARCH_TRACKS_REQUEST, fetchSearchedTracks)
}

export function* watchFetchRemoveTrackFromPlaylist() {
  yield takeEvery(REMOVE_TRACK_REQUEST, fetchRemoveTrackFromPlaylist)
}

export function* watchFetchPlaylists() {
  yield takeEvery(FETCH_PLAYLISTS, fetchPlaylistsFlow)
}

export function* watchFetchPlaylistEditDetails() {
  yield takeEvery(EDIT_PLAYLIST_REQUEST, fetchPlaylistEditDetails)
}
