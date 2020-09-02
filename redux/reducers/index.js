import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { AuthActions } from 'redux/actions';
import AuthReducer from './authReducer';
import OrderReducer from './orderReducer';

const appReducer = combineReducers({
  form: formReducer,
  auth: AuthReducer,
  order: OrderReducer,
});

const rootReducer = (state, action) => {
  if (action.type === AuthActions.LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
