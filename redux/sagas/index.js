import { fork, all } from 'redux-saga/effects';
import orderSagas from './orderSagas';
import sessionSagas from './sessionSagas';

export default function* sagas() {
  yield all([fork(orderSagas)]);
  yield all([fork(sessionSagas)]);
}
