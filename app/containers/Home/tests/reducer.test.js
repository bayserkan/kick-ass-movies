import homeReducer from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      session_id: '',
      request_token: '',
      user: {},
      movies: [],
      error: '',
      loading: false
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {})).toEqual(expectedResult);
  });
});
