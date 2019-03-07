import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

export default class UserManager extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        User manager
      </div>
    );
  }
}