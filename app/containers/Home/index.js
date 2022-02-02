import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  sessionSelector,
  requestIdSelector,
  userSelector,
  errorSelector,
  loadingSelector,
  moviesSelector
} from './selectors';
import { getAccountInfo, getMovies } from './actions';
import reducer from './reducer';
import saga from './saga';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Movies from 'components/Movies';
import Loading from '../../images/loading.gif';
import _ from 'lodash';

export function Home({ sessionId, requestId, user, errorMsg, loading, movies, getAccountInfo, getMovies }) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });

  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    getMovies(activePage);
  }, []);

  useEffect(() => {
    if (sessionId) {
      getAccountInfo(sessionId);
    }
  }, [sessionId]);

  return (
    <div className="container-fluid">
      <Helmet>
        <title>Kick Ass Movies - Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      <Header user={user} sessionId={sessionId} getMoviesData={(page) => {
          getMovies(page);
          }} />
      {
        loading ? 
        <div className="loadingWrapper">
            <img src={Loading} />
        </div> : 
        <Movies data={movies} sessionId={sessionId} user={user} getMoviesData={(page) => {
          getMovies(page);
          }} />
      }
      <Footer />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  sessionId: sessionSelector(),
  requestId: requestIdSelector(),
  user: userSelector(),
  movies: moviesSelector(),
  errorMsg: errorSelector(),
  loading: loadingSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAccountInfo: (id) => { dispatch(getAccountInfo(id)) },
    getMovies: (page) => { dispatch(getMovies(page)) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Home);
