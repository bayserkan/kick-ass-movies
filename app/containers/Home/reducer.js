import produce from 'immer';
import {
  SET_REQUEST_TOKEN,
  SET_SESSION_ID,
  GET_ACCOUNT_INFO_ERROR,
  GET_ACCOUNT_INFO_SUCCESS,
  GET_MOVIES,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_ERROR
} from './constants';

export const initialState = {
  session_id: '',
  request_token: '',
  user: {},
  movies: [],
  error: '',
  loading: false
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_SESSION_ID:
        draft.session_id = action.id;
        break;
      case SET_REQUEST_TOKEN:
        draft.request_token = action.token;
        break;
      case GET_ACCOUNT_INFO_ERROR:
        draft.error = action.error;
        break;
      case GET_ACCOUNT_INFO_SUCCESS:
        draft.user = action.user;
        break;
      case GET_MOVIES:
        draft.loading = true;
        break;
      case GET_MOVIES_SUCCESS:
        draft.movies = action.movies;
        draft.loading = false;
        break;
      case GET_MOVIES_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      default:
        return state;
    }
  });

export default homeReducer;
