import { put, takeEvery } from 'redux-saga/effects'
import { CLEAR_SEARCH } from '../search/searchActions'
import {
    CLEAR_SUGGESTION
} from '../suggestion/suggestionActions'
import { TRACK_DESELECTED } from '../track/trackActions'
import {
    SELECT_PAGE
} from './activeActions'

export function* SelectPage() {
  try {
    yield put({ type: CLEAR_SUGGESTION })
    yield put({ type: CLEAR_SEARCH })
    yield put({ type: TRACK_DESELECTED })
  } catch (error) {
    console.log(error)
  }
}

export function* watchSelectPage() {
  yield takeEvery(SELECT_PAGE, SelectPage)
}
