import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Import Action

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(/*Imported Action*/, dispatch);
};

class __Name__ extends React.Component {
  render() {
    return (
      <div>
        
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(__Name__);
