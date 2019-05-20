import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/EmployeeScreen';
import DataTable from './EmployeeDatatable';
import InfoScreen from  './InfoScreen';

const initialState = {
    departureTime : '',
    accomodation : '',
    city : '',
    show: false
  };
class EmployeeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.props.getAllTravels();
  }

  showInfo(id){
      this.setState({show: !this.state.show})
  }

  onClose(){
    this.setState({show: !this.state.show})
  }
  
  render() {
    console.log(this.props.travels)
    return (

      <div className='page-frame'>
        <title>Travels</title>
        <h2>Your travels</h2>
        <hr />
        <div>
          {this.state.show ? <InfoScreen onClose={this.onClose.bind(this)} /> : null}
        </div>
        <DataTable 
            travels={this.props.travels}
            approveTravel={this.props.approveTravel}
            showInfo={this.showInfo.bind(this)}
            show={this.state.show}/> 
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