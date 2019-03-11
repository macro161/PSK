import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/StatisticsScreen';
import Stats from './Stats';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Test from './Data';



class StatisticsScreen extends React.Component {

  constructor(props){
    super(props);
    
  }
  componentDidMount() {
    this.props.getStats();
    console.log(this.props.stats);
    this.props.getStats();
    this.props.getStatsByName('Justas')
    console.log(this.props.travelCount);
    console.log("nig")

  }

  render() {
    const { stats } = this.props;
   
    return(
      <div className='page-frame'>
      {stats.map(stat => {
        return (
        <Test mostTrips={stat.mostTrips}
              mostExpensive={stat.mostExpensive}
              cheapest={stat.cheapest}
              shortest={stat.shortest}
              longest={stat.shortest}
              getStatsByName={this.props.getStatsByName}
              travelCount={this.props.traveldata.map(data => {return(data.travelCount)})}/>);
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
    stats: PropTypes.arrayOf(PropTypes.shape({
      mostTrips: PropTypes.string,
      mostExpensive: PropTypes.string,
      cheapest: PropTypes.string,
      shortest: PropTypes.string,
      longest: PropTypes.string,
    })),
    traveldata: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      travelCount: PropTypes.number})),
    getStats: PropTypes.func,
    getStatsByName: PropTypes.func
  };