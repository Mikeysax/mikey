import React from 'react';
import {connect} from 'react-redux';
import signOut from '../actions/signOut';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import browserHistory from 'react-router';

const mapStateToProps = (state) => {
  return {
    'currentUser': state.currentUser
  }
};

@connect(
  mapStateToProps,
    dispatch => ({
      ... bindActionCreators({ signOut }, dispatch)
    })
)

export default class EntryPoint extends React.Component {
  render() {
    return (
      <div>
        <h2 className="text-center">Hello, Signed In User</h2>
        <p onClick={() => { this.signOut(); } }>Sign Out</p>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if(!_.isNumber(nextProps.currentUser.id)) {
      browserHistory.push('/');
    }
  }

  signOut() {
    this.props.signOut(this.props.currentUser);
  }
}
