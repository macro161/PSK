import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GetMe } from '../../actions/Login';

class Authentication extends React.Component{
  constructor(props){
    super(props);
    this.props.GetMe();
  }
  render(){
    return null;
  }
}

export default connect(
  null,
  (dispatch) => bindActionCreators({
    GetMe,
  }, 
  dispatch)
)(Authentication);

Authentication.propTypes = {
  GetMe: PropTypes.func,
};