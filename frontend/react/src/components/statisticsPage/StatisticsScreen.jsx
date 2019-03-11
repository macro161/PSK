import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/StatisticsScreen';
import Stats from './Stats';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Test from '../../components/statisticsPage/Test';



class StatisticsScreen extends React.Component {

  constructor(props){
    super(props);
    
  }
  componentDidMount() {
    this.props.getStats();
  }

  render() {
    const { stats } = this.props;
    return (
      <div className='page-frame'>
            <Test/>
            <p>Testas</p>
          
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