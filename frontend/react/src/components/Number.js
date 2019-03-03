import React, { Component } from 'react';
import {connect} from 'react-redux';

class Number extends Component {

  increment = () => {
    this.props.dispatch({type: 'INC_NUMB'});
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

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

export default connect(mapStateToProps)(Number);