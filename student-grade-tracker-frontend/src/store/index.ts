import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { studentReducer, StudentState } from './studentSlice';
import { authReducer, AuthState } from '../features/auth/authSlice';

export interface RootState {
  students: StudentState;
  auth: AuthState;
}

const rootReducer = combineReducers({
  students: studentReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
