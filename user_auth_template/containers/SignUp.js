import React from 'react';
import { connect } from 'react-redux';
import browserHistory from 'react-router';
import SignUpForm from '../components/SignUpForm';
import signUp from '../actions/signUp';
import { bindActionCreators } from 'redux';
import getParams from '../helpers/getParams';
import _ from 'lodash';

const mapStateToProps = (state) => {
  return {
    'signup' : getParams(state.form.signup, ['nickname', 'email', 'password']),
    'currentUser': state.currentUser
  };
}

@connect(
  mapStateToProps,
  dispatch => ({
    ... bindActionCreators({ signUp }, dispatch)
  })
)

export default class SignUp extends React.Component {
  submit(e) {
    const userAttributes = {
      user: {
        nickname: this.props.signup.nickname,
        email:    this.props.signup.email,
        password: this.props.signup.password
      }
    };

    this.props.signUp(userAttributes);


    e.preventDefault();
  }

  componentWillReceiveProps(nextProps) {
    if(_.isNumber(nextProps.currentUser.id)) {
      browserHistory.push('entry-point');
    }
  }

  render() {
    return (
      <SignUpForm
      submit={(e) => { this.submit(e); } }
      currentUser={this.props.currentUser}
      />
    );
  }
}
