import React from 'react';

export default class InputField extends React.Component {
  render() {

    let errors = '';
    if(this.props.errors !== undefined && this.props.errors.length > 0) {
      errors = <div className="error">{this.props.errors[0]}</div>;
    }

    return (
      <div>
        <label>{this.props.label}:</label>
        <input
          type={this.props.type}
          className="form-control"
          placeholder={this.props.placeholder}
          {...this.props.field}
        />

        {errors}
      </div>
    );
  }
}
