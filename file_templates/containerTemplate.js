import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Import Action

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(/*Imported Action*/, dispatch);
}

class __Name__Container extends React.Component {
  render() {
    return (
      <div></div>
    );
  }
};

const __Name__ = connect(mapStateToProps, mapDispatchToProps)(__Name__Container);

export default __Name__;
