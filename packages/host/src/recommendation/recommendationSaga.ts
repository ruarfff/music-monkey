import { call, put, takeEvery } from 'redux-saga/effects'
import { Track } from 'mm-shared'
import {
  FETCH_RECOMMENDATIONS_FAILURE,
  FETCH_RECOMMENDATIONS_REQUEST,
  FETCH_RECOMMENDATIONS_SUCCESS
} from './recommendationActions'
import { getUserTopTracks } from './recommendationClient'

function* fetchRecommendationsFlow() {
  try {
    const tracks: Track[] = yield call(getUserTopTracks)
    yield put({ type: FETCH_RECOMMENDATIONS_SUCCESS, payload: tracks })
  } catch (err) {
    yield put({ type: FETCH_RECOMMENDATIONS_FAILURE, payload: err })
  }
}

export function* watchFetchRecommendation() {
  yield takeEvery(FETCH_RECOMMENDATIONS_REQUEST, fetchRecommendationsFlow)
}
