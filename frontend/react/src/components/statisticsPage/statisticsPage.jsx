import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStats } from '../../actions/statisticsActions';

const initialState = {
    fetching: false,
    fetched: false,
    stats: [],
    error: null
 };

class StatisticsScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.props.getStats();
    console.log("nig")
  }


  render() {
    return (
      <div className='page-frame'>
            <p>Testas</p>
      </div>
    );
  } 
}
const mapStateToProps = state => {
    return {
      stats: state.stats,
      fetching: state.fetching,
      error: state.error,
      fetched: state.fetched
    };
  };
export default connect(mapStateToProps, { getStats })(StatisticsScreen);

