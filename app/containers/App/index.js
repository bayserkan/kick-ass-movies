import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Home from 'containers/Home/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import {setSessionId, setRequestToken} from 'containers/Home/actions';

import GlobalStyle from '../../global-styles';
import axios from 'axios';

export function App({setSessionId, setRequestToken}) {

  useEffect(() => {
    axios.get('3/authentication/token/new?api_key=932e87f6a3b4d6fa7a97cc56d50c88b7')
      .then((response) => {
        setRequestToken(response.data.request_token);
        axios.post('3/authentication/token/validate_with_login?api_key=932e87f6a3b4d6fa7a97cc56d50c88b7', {
          username: "bayserkan",
          password: "123456tmdb",
          request_token: response.data.request_token
        })
          .then((auth) => {
            axios.post('3/authentication/session/new?api_key=932e87f6a3b4d6fa7a97cc56d50c88b7', {
              request_token: auth.data.request_token
            })
              .then((session) => {
                setSessionId(session.data.session_id);
              })
              .catch((error) => {
                console.log(error, 'error'); 
              })
          })
          .catch((error) => {
            console.log(error, 'error'); 
          });
      })
      .catch(function (error) {
        console.log(error, 'error');
      });
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setSessionId: (id) => dispatch(setSessionId(id)),
    setRequestToken: (token) => dispatch(setRequestToken(token)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(App);