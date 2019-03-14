import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/EmployeeScreen';
import DataTabel from './EmployeeDatatable';

const initialState = {
    departureTime : '',
    accomodation : '',
    city : '',
  };
class EmployeeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.props.getAllTravels();
  }
  
  render() {
    return (

      <div className='page-frame'>
        <title>Travels</title>
        <DataTabel 
            travels={this.props.travels}
            approveTravel={this.props.approveTravel}
            cancelTravel={this.props.cancelTravel}/>
            
        
      </div>
    );
  }
}

export default connect(
  (state) => ({travels: state.EmployeeScreen.travels}),
  (dispatch) => bindActionCreators(
    {
      getAllTravels: actions.getAllTravels,
      approveTravel: actions.approveTravel,
      cancelTravel: actions.cancelTravel,
  }, dispatch))(EmployeeScreen);

EmployeeScreen.propTypes = {
  travels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    departureTime: PropTypes.string,
    accomodation: PropTypes.string,
    city: PropTypes.string,
  })),
  getAllTravels: PropTypes.func,
  approveTravel: PropTypes.func,
  cancelTravel: PropTypes.func,
  seeTravelDetails: PropTypes.func,
};