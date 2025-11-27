import { Dispatch } from 'redux';
import * as authService from './authService';

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: authService.isAuthenticated(),
  user: null,
  loading: false,
  error: null,
};

// Actions
const LOGIN_START = 'LOGIN_START';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGOUT = 'LOGOUT';

interface LoginStartAction {
  type: typeof LOGIN_START;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    id: string;
    email: string;
    name: string;
  };
}

interface LoginErrorAction {
  type: typeof LOGIN_ERROR;
  payload: string;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

type AuthAction = LoginStartAction | LoginSuccessAction | LoginErrorAction | LogoutAction;

// Reducer
export const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

// Thunks
export const loginUser = (email: string, password: string) => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: LOGIN_START });
  try {
    const response = await authService.login({ email, password });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.user,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Login failed';
    dispatch({
      type: LOGIN_ERROR,
      payload: errorMessage,
    });
  }
};

export const logoutUser = () => (dispatch: Dispatch<AuthAction>) => {
  authService.logout();
  dispatch({ type: LOGOUT });
};
