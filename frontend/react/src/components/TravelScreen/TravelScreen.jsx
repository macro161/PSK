import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as actions from '../../actions/TravelScreen';
import { getOffices } from '../../actions/Offices';
import { getAllEmployees } from '../../actions/UserManager';
import DataTable from './TravelDataTable';
import InfoScreen from '../employeeScreen/InfoScreen';
import EditForm from './TravelEditForm';
import RegisterForm from './TravelRegisterForm';
import Button from '@material-ui/core/Button';

const initialState = {
    fullName: '',
    departureTime : '',
    returningTime: '',
    city: '',
    approved: false,
    showEdit: false,
    showRegister: false,
    show: false
  };
class TravelScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.props.getAllTravels(1);
    this.props.getAllEmployees();
    this.props.getOffices();
    this.props.getAllEmployeeTrips();
  }

  showInfo(id){
      this.setState({show: !this.state.show})
  }

  onClose() {
    this.setState(initialState)
  }

  editTravel(travel) {
    this.setState({
      showEdit:true,
      travel : travel,
    })
    console.log("edit travel:")
    console.log(travel)
  }

  onEditSave(id, fullName, departure, accommodation, city, approved){
    this.props.editTravel(id, fullName, departure, accommodation, city, approved);
    this.setState(initialState)
  }
  
  onSubmit(employee, leavingDate, returningDate, fromOffice, toOffice, tripChecklist){
    this.props.registerTravel(employee, leavingDate, returningDate, fromOffice, toOffice, tripChecklist);
    this.setState(initialState)
    this.props.getAllEmployeeTrips();
  }

  removeTravel(id){
    this.props.removeTravel(id);
  }

  addTravelClick(){
    this.setState({
      showRegister:true
    })
  }

  render() {
    console.log(this.props.employeeTrips)
    return (
      <div className='page-frame'>
        <title>Travels</title>
        <h2>Organise travels</h2>
          <hr/>
          <Button variant ="contained" onClick={this.addTravelClick.bind(this)} className="register-travel-button" variant="contained" color="secondary"> Add travel </Button>
        <div>
            {this.state.show ? <InfoScreen onClose={this.onClose.bind(this)} /> : null}
        </div>
        <DataTable 
            employeeTrips={this.props.employeeTrips}
            approveTravel={this.props.approveTravel}
            cancelTravel={this.props.cancelTravel}
            showInfo={this.showInfo.bind(this)}
            show={this.state.show}
            editTravel={this.editTravel.bind(this)}
            removeTravel={this.props.removeTravel} />
            {this.state.showEdit ? 
            <EditForm travel={this.state.travel}
            onEditSave={this.onEditSave.bind(this)}
            onClose={this.onClose.bind(this)} 
            /> : null}
            {this.state.showRegister ? 
            <RegisterForm 
            onClose={this.onClose.bind(this)}
            onSubmit={this.onSubmit.bind(this)}
            employees={this.props.employees}
            offices={this.props.offices} /> : null}
        <br/><br/>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    travels: state.TravelScreen.travels,
    employeeTrips: state.TravelScreen.employeeTrips,
    employees: state.UserManager.employees,
    offices: state.Offices.offices
  }),
  (dispatch) => bindActionCreators(
    {
       getAllEmployees: getAllEmployees,
        getOffices : getOffices,
        getAllTravels: actions.getAllTravels,
        approveTravel: actions.approveTravel,
        cancelTravel: actions.cancelTravel,
        editTravel: actions.editTravel,
        removeTravel: actions.removeTravel,
      registerTravel: actions.registerTravel,
        getAllEmployeeTrips: actions.getAllEmployeeTrips,
  }, dispatch))(TravelScreen);

TravelScreen.propTypes = {
  employeeTrips: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    fullName : PropTypes.string,
    leavingDate: PropTypes.string,
    returningDate: PropTypes.string,
    leavingOffice: PropTypes.string,
    destinationOffice: PropTypes.string,
    approved: PropTypes.bool,
    tripChecklist: PropTypes.shape({
      plainTickets : PropTypes.number,
      car: PropTypes.number,
      apartments: PropTypes.number,
    }),
  })),
  offices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    city: PropTypes.string,
    address: PropTypes.string
  })),
  employees: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    fullName : PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
  })),
    show: PropTypes.bool,
    getAllTravels: PropTypes.func,
    approveTravel: PropTypes.func,
    cancelTravel: PropTypes.func,
    seeTravelDetails: PropTypes.func,
    editTravel: PropTypes.func,
    removeTravel: PropTypes.func,
  registerTravel: PropTypes.func,
    getAllEmployeeTrips: PropTypes.func,
};