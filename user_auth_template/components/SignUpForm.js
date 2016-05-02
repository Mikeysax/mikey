import React from 'react';
import {reduxForm} from 'redux-form';
import InputField from './InputField';
import {Link} from 'react-router';

class SignUpForm extends React.Component {
  render() {
    const {fields: {email, nickname, password}, submit} = this.props;
    const errors = this.props.currentUser.errors || {};



    return (
      <div className="card col-xs-6 col-xs-offset-3">
        <h1 className="text-center">Sign up for Slackr</h1>
        <form className="sign-up-form text-center" onSubmit={submit}>
          <div className="col-xs-6 col-xs-offset-3">


            <InputField
              type="text"
              placeholder="Nickname"
              label={<span>Enter your <strong>nickname</strong></span>}
              field={nickname} errors={errors.nickname}
            />

            <InputField
              type="text"
              placeholder="Email"
              label={<span>Enter your <strong>email</strong></span>}
              field={email} errors={errors.email}
            />

            <InputField
              type="password"
              placeholder="Password"
              label={<span>Enter your <strong>password</strong></span>}
              field={password} errors={errors.password}
            />

            <button type="submit" className="btn btn-block btn-primary">Create Account</button>

          </div>
          <br className="clear" />

          <div className="text-center orSignIn">
            <Link to='sign-in'>Sign In</Link>
          </div>
        </form>
      </div>
    );
  }

}

SignUpForm = reduxForm({
  form: 'signup',
  fields: ['nickname', 'email', 'password']
})(SignUpForm);

export default SignUpForm;
