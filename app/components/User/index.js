import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {userSelector} from '../../containers/Home/selectors';
import _ from 'lodash';
import './User.css';

function User({user}) {
  let userInfo;
  if (!_.isEmpty(user)) {
    userInfo = 
    <>
      <span>{user.username}</span>
      <div className="avatar">
          {user.username[0]}
        </div>
    </>
  }
  return (
    <div className="user">
        {userInfo}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: userSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(User);