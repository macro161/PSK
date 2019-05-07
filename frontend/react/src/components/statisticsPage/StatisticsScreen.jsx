import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/StatisticsScreen';
import Stats from './Stats';
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
    //this.props.getStatsByName('Justas');
  }

  render() {
    //const { Stats } = this.props; // Unused?
   
    return (
      <div className='page-frame'>
       { 
           <Data mostCommonTripDestination={this.props.mostTrmostCommonTripDestinationips}
             mostExpensiveTripOrigin={this.props.mostExpensiveTripOrigin}
             mostExpensiveTripDestination={this.props.mostExpensiveTripDestination}
              cheapestTripOrigin={this.props.cheapestTripOrigin}
              cheapestTripDestination={this.props.cheapestTripDestination}
              shortestTripOrigin={this.props.shortestTripOrigin}
              shortestTripDestination={this.props.shortestTripDestination}
              longestTripOrigin={this.props.longestTripOrigin}
              longestTripDestination={this.props.longestTripDestination}
              getStatsByName={this.props.getStatsByName}
              //employeeTripQuantity={this.props.traveldata.map(data => { return (data.employeeTripQuantity) })}
              //periodTripQuantity={this.props.traveldata.map(data => {return(data.periodTripQuantity)})}
          />
      })}
            
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
    }),
    traveldata: PropTypes.shape({
      name: PropTypes.string,
      employeeTripQuantity: PropTypes.number,
      periodTripQuantity: PropTypes.number,
    }),
    getStats: PropTypes.func,
    getStatsByName: PropTypes.func
  };