import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStats } from '../../actions/statisticsActions';
import Stats from './Stats';



class StatisticsScreen extends React.Component {

  constructor(props){
    super(props);

  }

  componentWillMount() {
    this.props.getStats();
    console.log("nig")
  }

  render() {
    const { stats } = this.props;
    return (
      <div className='page-frame'>
            <p>Testas</p>
            <Stats stats={stats} />
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

