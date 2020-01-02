import { call, put, takeEvery } from 'redux-saga/effects'
import { Action, User } from 'mm-shared'
import {
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
} from './userActions'
import { updateUserById } from './userClient'

function* updateUserFlow(action: Action) {
  const user: User = action.payload

  try {
    const editedUser = yield call(updateUserById, user)
    yield put({
      payload: editedUser.data,
      type: UPDATE_USER_SUCCESS
    })
  } catch (err) {
    yield put({ type: UPDATE_USER_FAILURE, payload: err })
  }
}

export function* watchUpdateUserFlow() {
  yield takeEvery(UPDATE_USER_REQUEST, updateUserFlow)
}
