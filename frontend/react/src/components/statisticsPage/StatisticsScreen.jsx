import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/StatisticsScreen';
import Stats from './Stats';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';



class StatisticsScreen extends React.Component {

  constructor(props){
    super(props);
  }

  componentWillMount() {
    console.log("nig")
    this.props.getStats();
  }

  render() {
    const { stats } = this.props;

    console.log('test')
    console.log(stats)
    return (
      <div className='page-frame'>
            <p>Testas</p>
            <Stats stats={stats} />
      </div>
    );
  } 
}
export default connect(
  (state) => ({
    stats: state.StatisticScreen.stats,
  }),
  (dispatch) => bindActionCreators({
    getStats: actions.getStats,
  }, dispatch))(StatisticsScreen);


  StatisticsScreen.propTypes =  {
    stats: PropTypes.any,
    getStats: PropTypes.func,
  };