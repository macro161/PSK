import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/EmployeeScreen';
import DataTable from './EmployeeDatatable';

class EmployeeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.getAllTravels();
  }

  showInfo(id){
      this.setState({show: !this.state.show})
  }

  onClose(){
    this.setState({show: !this.state.show})
  }
  
  render() {
    return (
      <div className='page-frame'>
        <title>Travels</title>
        <h2>Your travels</h2>
        <hr />
        <DataTable 
            travels={this.props.travels}/>
      </div>
    );
  }
}

export default connect(
  (state) => ({travels: state.EmployeeScreen.travels}),
  (dispatch) => bindActionCreators(
    {
      getAllTravels: actions.getAllTravels,
  }, dispatch))(EmployeeScreen);

EmployeeScreen.propTypes = {
  travels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    departureTime: PropTypes.string,
    accomodation: PropTypes.string,
    city: PropTypes.string,
    approved: PropTypes.bool
  })),
  show: PropTypes.bool,
  getAllTravels: PropTypes.func,
  approveTravel: PropTypes.func,
  seeTravelDetails: PropTypes.func,
};