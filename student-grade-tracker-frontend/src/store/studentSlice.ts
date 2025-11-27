import { Student } from '../types';
import * as api from '../services/api';
import { Dispatch } from 'redux';

export interface StudentState {
  items: Student[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  items: [],
  loading: false,
  error: null,
};

// Actions
const FETCH_STUDENTS_START = 'FETCH_STUDENTS_START';
const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';
const FETCH_STUDENTS_ERROR = 'FETCH_STUDENTS_ERROR';

interface FetchStudentsStartAction {
  type: typeof FETCH_STUDENTS_START;
}

interface FetchStudentsSuccessAction {
  type: typeof FETCH_STUDENTS_SUCCESS;
  payload: Student[];
}

interface FetchStudentsErrorAction {
  type: typeof FETCH_STUDENTS_ERROR;
  payload: string;
}

type StudentAction = FetchStudentsStartAction | FetchStudentsSuccessAction | FetchStudentsErrorAction;

// Reducer
export const studentReducer = (state = initialState, action: StudentAction): StudentState => {
  switch (action.type) {
    case FETCH_STUDENTS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
        error: null,
      };
    case FETCH_STUDENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Thunks
export const fetchStudents = () => async (dispatch: Dispatch<StudentAction>) => {
  dispatch({ type: FETCH_STUDENTS_START });
  try {
    const students = await api.getStudents();
    dispatch({
      type: FETCH_STUDENTS_SUCCESS,
      payload: students,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch students';
    dispatch({
      type: FETCH_STUDENTS_ERROR,
      payload: errorMessage,
    });
  }
};
