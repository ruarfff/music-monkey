import { call, put, takeEvery } from 'redux-saga/effects'
import IAction from '../IAction'
import {
  FETCH_EVENT_VOTES_FAILURE,
  FETCH_EVENT_VOTES_INITIATED,
  FETCH_EVENT_VOTES_SUCCESS
} from './voteActions'
import { fetchEventVotes } from './voteClient'

function* fetchEventVotesFlow({ payload }: IAction) {
  try {
    const votes = yield call(fetchEventVotes, payload)
    yield put({ type: FETCH_EVENT_VOTES_SUCCESS, payload: votes })
  } catch (err) {
    yield put({ type: FETCH_EVENT_VOTES_FAILURE, payload: err })
  }
}

export function* watchFetchEventVotes() {
  yield takeEvery(FETCH_EVENT_VOTES_INITIATED, fetchEventVotesFlow)
}
