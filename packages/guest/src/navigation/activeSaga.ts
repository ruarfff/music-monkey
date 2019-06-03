import { put, takeEvery } from 'redux-saga/effects'
import { CLEAR_SEARCH } from '../search/searchActions'
import { CLEAR_SUGGESTION } from '../suggestion/suggestionActions'
import { SELECT_PAGE } from './activeActions'

export function* selectPage() {
  try {
    yield put({ type: CLEAR_SUGGESTION })
    yield put({ type: CLEAR_SEARCH })
  } catch (error) {
    console.log(error)
  }
}

export function* watchSelectPage() {
  yield takeEvery(SELECT_PAGE, selectPage)
}
