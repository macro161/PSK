import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/StatisticsScreen';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Data from './Data';



class StatisticsScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      stats: {},
      traveldata: {}
    }
  }
  
  componentDidMount() {
    this.props.getStats();
  }

  render() {
    return (
      <div className='page-frame'>
      
        { 
          
           <Data mostCommonTripDestination={this.props.stats.mostCommonTripDestination}
            mostExpensiveTripOrigin={this.props.stats.mostExpensiveTripOrigin}
            mostExpensiveTripDestination={this.props.stats.mostExpensiveTripDestination}
            cheapestTripOrigin={this.props.stats.cheapestTripOrigin}
            cheapestTripDestination={this.props.stats.cheapestTripDestination}
            shortestTripOrigin={this.props.stats.shortestTripOrigin}
            shortestTripDestination={this.props.stats.shortestTripDestination}
            longestTripOrigin={this.props.stats.longestTripOrigin}
            longestTripDestination={this.props.stats.longestTripDestination}
            employeeTripQuantity={this.props.stats.employeeTripQuantity}
            periodTripQuantity={this.props.stats.periodTripQuantity}
            getStatsByName={this.props.getStatsByName}
            getStatsByDate={this.props.getStatsByDate}
          />
      } 
      </div>)
  } 
}
export default connect(
  (state) => ({
    stats: state.StatisticScreen.stats,
    traveldata: state.StatisticScreen.traveldata
  }),
  (dispatch) => bindActionCreators({
    getStats: actions.getStats,
    getStatsByName: actions.getStatsByName,
    getStatsByDate: actions.getStatsByDate,
  }, dispatch))(StatisticsScreen);


  StatisticsScreen.propTypes =  {
    stats: PropTypes.shape({
      mostCommonTripDestination: PropTypes.string,
      mostExpensiveTripOrigin: PropTypes.string,
      mostExpensiveTripDestination: PropTypes.string,
      cheapestTripOrigin: PropTypes.string,
      cheapestTripDestination: PropTypes.string,
      shortestTripOrigin: PropTypes.string,
      shortestTripDestination: PropTypes.string,
      longestTripOrigin: PropTypes.string,
      longestTripDestination: PropTypes.string,
      employeeTripQuantity: PropTypes.number,
      periodTripQuantity: PropTypes.number,
    }),
    getStats: PropTypes.func,
    getStatsByName: PropTypes.func,
    getStatsByDate: PropTypes.func,
  };