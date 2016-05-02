import React from 'react';
import {reduxForm} from 'redux-form';
import InputField from './InputField';

class SignInForm extends React.Component {

  render() {
    const {fields: {email, nickname, password} } = this.props;

    const errors = this.props.currentUser.errors || {};

    return (
      <div className="card col-xs-6 col-xs-offset-3">
        <h1 className="text-center">Sign In to Slackr</h1>
        <form className="sign-up-form" onSubmit={this.props.submit}>

            <div className="form-group text-center col-sm-6 col-sm-offset-3">
              <InputField
                type="text"
                placeholder="Email"
                label={<span>Enter your <strong>email</strong></span>}
                field={email}
                errors={errors.email}
              />

              <InputField
                type="password"
                placeholder="Password"
                label={<span>Enter your <strong>password</strong></span>}
                field={password}
                errors={errors.password}
              />
            </div>

            <br className="clear" />

            <div className="col-xs-6 col-xs-offset-3">
              <button type="submit" className="btn btn-block btn-primary">Sign In</button>
            </div>
        </form>
      </div>
    );
  }
}

SignInForm = reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(SignInForm);

export default SignInForm;
