import React from 'react';
import SignInForm from '../components/SignInForm';
import {connect} from 'react-redux';
import getParams from '../helpers/getParams';
import signIn from '../actions/signIn';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import history from '../helpers/history';

const mapStateToProps = (state) => {
  return {
    'signin': getParams(state.form.signin, ['email', 'password']),
    'currentUser': state.currentUser
  }
};

@connect(
  mapStateToProps,
  dispatch => ({
    ... bindActionCreators({signIn}, dispatch)
  })
)

export default class SignIn extends React.Component {
  submit(e) {
    const signInAttributes = {
      user: {
        email: this.props.signin.email,
        password: this.props.signin.password
      }
    };

    this.props.signIn(signInAttributes);

    e.preventDefault();
  }

  componentWillReceiveProps(nextProps) {
    if (_.isNumber(nextProps.currentUser.id)) {
      history.push('entry-point');
    }
  }

  render() {
      return (
        <SignInForm
          submit={ (e) => {this.submit(e); }}
          currentUser={this.props.currentUser}
        />
      );
  }
}
