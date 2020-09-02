import { select, put, all, fork, takeLatest, call } from 'redux-saga/effects';
import idx from 'idx';
import axios from 'axios';
import {
  CREATE_NEW_SESSION,
  setUniqueSessionId,
} from 'redux/actions/authActions';

const getSession = state => state.auth && state.auth.sessionId;

/**
 * @description createNewSession
 * @namespace sessionSaga
 * @param  {} action payload: sessionId
 *
 */
function* createNewSession() {
  try {
    // make abtasty call first, then session call
    const existingSession = yield select(getSession);
    if (!existingSession) {
      const apiResponse = yield call(axios.get, '/start-session');
      if (idx(apiResponse, _ => _.data.token)) {
        const { token } = apiResponse.data;
        yield put(setUniqueSessionId({ sessionId: { id: token } }));
      }
    }
  } catch (error) {
    // eslint-disable-next-line
    console.log({ error });
  }
}

export default function* SessionSagas() {
  yield all([fork(takeLatest, CREATE_NEW_SESSION, createNewSession)]);
}
