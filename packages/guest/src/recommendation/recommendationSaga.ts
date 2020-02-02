import { call, put, takeEvery } from 'redux-saga/effects'
import { Track, getUserTopTracks } from 'mm-shared'
import {
  FETCH_RECOMMENDATIONS_FAILED,
  FETCH_RECOMMENDATIONS_INITIATED,
  FETCH_RECOMMENDATIONS_SUCCESS
} from './recommendationActions'

function* fetchRecommendationsFlow() {
  try {
    const tracks: Track[] = yield call(getUserTopTracks)
    yield put({ type: FETCH_RECOMMENDATIONS_SUCCESS, payload: tracks })
  } catch (err) {
    yield put({ type: FETCH_RECOMMENDATIONS_FAILED, payload: err })
  }
}

export function* watchFetchRecommendation() {
  yield takeEvery(FETCH_RECOMMENDATIONS_INITIATED, fetchRecommendationsFlow)
}
