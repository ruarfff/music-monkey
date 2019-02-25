import { call, put, select, takeEvery } from 'redux-saga/effects'
import IAction from '../IAction';
import {
  ADD_TRACK_REQUEST,
  addTrackError,
  addTrackSuccess,
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
    const playlists = yield call(fetchMoreUsersPlaylists, action.payload.user, action.payload.offset)
    yield put({ type: LOAD_MORE_PLAYLISTS_SUCCESS, payload: playlists })
  } catch (error) {
    yield put({ type: LOAD_MORE_PLAYLISTS_FAILURE, payload: error })
  }
}

function* fetchRemoveTrackFromPlaylist(action: IAction) {
  const { playlistId, trackUri, trackPosition } = action.payload
  try {
    const newPlaylist = yield call(removeTrackFromPlaylist, playlistId, trackUri, trackPosition)
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

function* fetchAddTrackToPlaylist(action: IAction) {
  try {
    const location = yield select(getCurrentLocation)
    const justCreatedPlaylists = yield select(getJustCreatedPlaylists)

    const isCreateOrEditPage = location.indexOf('create-event') !== -1 || location.indexOf('edit') !== -1

    const isJustCreated = justCreatedPlaylists.filter((playlist: any) =>
      playlist.id === action.payload.playlistId
    ).length === 1

    if (isCreateOrEditPage && isJustCreated) {
      yield call(addTracksToPlaylist, action.payload.playlistId, [action.payload.track.uri])
      yield call(fetchPlaylist, action.payload.playlistId)
    }

    if (!isCreateOrEditPage) {
      yield call(addTracksToPlaylist, action.payload.playlistId, [action.payload.track.uri])
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
