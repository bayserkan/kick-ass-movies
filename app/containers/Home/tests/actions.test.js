import { 
  getMovies,
  getMoviesError,
  getMoviesSuccess,
  setSessionId,
  setRequestToken,
  getAccountInfo,
  getAccountInfoError,
  getAccountInfoSuccess
 } from '../actions';
import { 
  SET_REQUEST_TOKEN,
  SET_SESSION_ID,
  GET_ACCOUNT_INFO,
  GET_ACCOUNT_INFO_ERROR,
  GET_ACCOUNT_INFO_SUCCESS,
  GET_MOVIES,
  GET_MOVIES_ERROR,
  GET_MOVIES_SUCCESS 
} from '../constants';

describe('Home actions', () => {
  describe('Sessiob Id set function', () => {
    it('has a type of SET_SESSION_ID', () => {
      const expected = {
        type: SET_SESSION_ID,
      };
      expect(setSessionId()).toEqual(expected);
    });
  });
});

describe('Home actions', () => {
  describe('Request token set function', () => {
    it('has a type of SET_REQUEST_TOKEN', () => {
      const expected = {
        type: SET_REQUEST_TOKEN,
      };
      expect(setRequestToken()).toEqual(expected);
    });
  });
});

describe('Home actions', () => {
  describe('Account info get function', () => {
    it('has a type of SET_SESSION_ID', () => {
      const expected = {
        type: GET_ACCOUNT_INFO,
      };
      expect(getAccountInfo()).toEqual(expected);
    });
  });
});

describe('Home actions', () => {
  describe('Account info success function', () => {
    it('has a type of GET_ACCOUNT_INFO_SUCCESS', () => {
      const expected = {
        type: GET_ACCOUNT_INFO_SUCCESS,
      };
      expect(getAccountInfoSuccess()).toEqual(expected);
    });
  });
});

describe('Home actions', () => {
  describe('Account info error function', () => {
    it('has a type of GET_ACCOUNT_INFO_ERROR', () => {
      const expected = {
        type: GET_ACCOUNT_INFO_ERROR,
      };
      expect(getAccountInfoError()).toEqual(expected);
    });
  });
});

describe('Home actions', () => {
  describe('Movies data get function', () => {
    it('has a type of GET_MOVIES', () => {
      const expected = {
        type: GET_MOVIES,
      };
      expect(getMovies()).toEqual(expected);
    });
  });
});

describe('Home actions', () => {
  describe('Movies data success function', () => {
    it('has a type of GET_MOVIES_SUCCESS', () => {
      const expected = {
        type: GET_MOVIES_SUCCESS,
      };
      expect(getMoviesSuccess()).toEqual(expected);
    });
  });
});

describe('Home actions', () => {
  describe('Movies data error function', () => {
    it('has a type of GET_MOVIES_ERROR', () => {
      const expected = {
        type: GET_MOVIES_ERROR,
      };
      expect(getMoviesError()).toEqual(expected);
    });
  });
});
