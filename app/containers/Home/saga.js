import { put, takeLatest } from 'redux-saga/effects';
import { GET_ACCOUNT_INFO, GET_MOVIES } from './constants';
import { getAccountInfoError, getAccountInfoSuccess, getMoviesError, getMoviesSuccess } from './actions';
import axios from 'axios';

export function* getAccountInfoFunc(data) {
  try {
    const account = yield axios.get('3/account?api_key=932e87f6a3b4d6fa7a97cc56d50c88b7&session_id=' + data.id);
    yield put(getAccountInfoSuccess(account.data));
  }
  catch (err) {
    yield put(getAccountInfoError(err.message));
  }
}

export function* getMoviesFunc(data) {
  try {
    const response = yield axios.get('3/movie/popular?api_key=932e87f6a3b4d6fa7a97cc56d50c88b7&language=en-US&page=' + data.page);
    yield put(getMoviesSuccess(response.data));
  }
  catch (err) {
    yield put(getMoviesError(err.message));
  }
}

// Individual exports for testing
export default function* homeSaga() {
  yield takeLatest(GET_ACCOUNT_INFO, getAccountInfoFunc);
  yield takeLatest(GET_MOVIES, getMoviesFunc);
}
