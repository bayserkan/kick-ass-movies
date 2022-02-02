import {
  SET_REQUEST_TOKEN,
  SET_SESSION_ID,
  GET_ACCOUNT_INFO,
  GET_ACCOUNT_INFO_ERROR,
  GET_ACCOUNT_INFO_SUCCESS,
  GET_MOVIES,
  GET_MOVIES_ERROR,
  GET_MOVIES_SUCCESS
} from './constants';

export function setSessionId(id) {
  return {
    type: SET_SESSION_ID,
    id
  };
}

export function setRequestToken(token) {
  return {
    type: SET_REQUEST_TOKEN,
    token
  };
}

export function getAccountInfo(id) {
  return {
    type: GET_ACCOUNT_INFO,
    id
  };
}

export function getAccountInfoSuccess(user) {
  return {
    type: GET_ACCOUNT_INFO_SUCCESS,
    user
  };
}

export function getAccountInfoError(error) {
  return {
    type: GET_ACCOUNT_INFO_ERROR,
    error
  };
}

export function getMovies(page) {
  return {
    type: GET_MOVIES,
    page
  };
}

export function getMoviesSuccess(movies) {
  return {
    type: GET_MOVIES_SUCCESS,
    movies
  };
}

export function getMoviesError(error) {
  return {
    type: GET_MOVIES_ERROR,
    error
  };
}