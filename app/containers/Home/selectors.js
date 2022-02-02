import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHomeDomain = state => state.home || initialState;

const sessionSelector = () => createSelector(selectHomeDomain, substate => substate.session_id);
const requestIdSelector = () => createSelector(selectHomeDomain, substate => substate.request_token);
const userSelector = () => createSelector(selectHomeDomain, substate => substate.user);
const moviesSelector = () => createSelector(selectHomeDomain, substate => substate.movies);
const errorSelector = () => createSelector(selectHomeDomain, substate => substate.error);
const loadingSelector = () => createSelector(selectHomeDomain, substate => substate.loading);

export {
    selectHomeDomain,
    sessionSelector,
    requestIdSelector,
    userSelector,
    errorSelector,
    moviesSelector,
    loadingSelector
};