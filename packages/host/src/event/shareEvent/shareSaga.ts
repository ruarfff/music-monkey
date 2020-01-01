import { call, put, takeEvery } from 'redux-saga/effects'
import { Action } from 'mm-shared'
import {
  SHARE_EMAIL_REQUEST,
  shareByEmailsFailure,
  shareByEmailsSuccess
} from './shareActions'
import { sendEmails } from './shareClient'

function* fetchShareEmail({ payload }: Action) {
  try {
    const { event, emails, emailText } = payload
    const res = yield call(sendEmails, emails, emailText, event)
    yield put(shareByEmailsSuccess(res))
  } catch (e) {
    yield put(shareByEmailsFailure(e))
  }
}

export function* watchFetchShareEmail() {
  yield takeEvery(SHARE_EMAIL_REQUEST, fetchShareEmail)
}
