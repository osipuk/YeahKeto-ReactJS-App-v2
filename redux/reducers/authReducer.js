import ip from 'icepick';
import { AuthActions } from 'redux/actions';

const initialState = ip.freeze({
  sessionId: null,
  abtastyParams: null,
  userInfo: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case AuthActions.SET_UNIQUE_SESSION_ID:
      return ip.setIn(state, ['sessionId'], action.payload.sessionId.id);
    case AuthActions.SET_ABTASTY_PARAMS:
      return ip.setIn(state, ['abtastyParams'], action.payload);
    case AuthActions.SET_IS_AUTHENTIC_PARAMS:
      return ip.setIn(state, ['isAuthentic'], action.payload);
    case AuthActions.SET_USER_INFO:
      return ip.setIn(state, ['userInfo'], action.payload);
    default:
      return state;
  }
}
