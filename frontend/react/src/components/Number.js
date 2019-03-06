import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/index';

class Number extends Component {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
  }

  increment() {
    this.props.dispatchIncrement(this.props.count);
  }
  render() {
    return(
      <div>
        <h2>Counter</h2>
        <div>
          <span>{this.props.count}</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    count: state.number.count,
  }),
  (dispatch) => bindActionCreators({
    dispatchIncrement: actions.incNumber,
  }, dispatch))(Number);

Number.propTypes = {
  count: PropTypes.any,
  dispatchIncrement: PropTypes.func,
};