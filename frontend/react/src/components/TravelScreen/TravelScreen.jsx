import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as actions from '../../actions/TravelScreen';
import { getOffices } from '../../actions/Offices';
import { getAllEmployees } from '../../actions/UserManager';
import DataTable from './TravelDataTable';
import EditForm from './TravelEditForm';
import RegisterForm from './TravelRegisterForm';
import Button from '@material-ui/core/Button';
import FlightForm from './FlightForm';

const initialState = {
    fullName: '',
    departureTime : '',
    returningTime: '',
    city: '',
    approved: false,
    showEdit: false,
    showRegister: false,
    
  };
class TravelScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.props.getOffices();
    this.props.getAllEmployeeTrips();
    this.props.getAllEmployees();
    this.props.getTrips();
  
  }

  onClose() {
    this.setState(initialState)
  }

  editTravel(travel) {
    this.setState({
      showEdit:true,
      travel : travel,
    })
  }

  onEditSave(id, fullName, departure, accommodation, city, approved){
    this.props.editTravel(id, fullName, departure, accommodation, city, approved);
    this.setState(initialState)
  }
  
  onSubmit(employee, leavingDate, returningDate, fromOffice, toOffice, tripChecklist){
    this.props.registerTravel(employee, leavingDate, returningDate, fromOffice, toOffice, tripChecklist);
    this.setState(initialState)
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
    return (
      <div className='page-frame'>
        <title>Travels</title>
        <h2>Organise travels</h2>
          <hr/>
          <Button variant ="contained" onClick={this.addTravelClick.bind(this)} className="register-travel-button" variant="contained" color="secondary"> Add travel </Button>
        <div>
        </div>
        <DataTable 
            employeeTrips={this.props.employeeTrips}
            trips={this.props.trips}
            approveTravel={this.props.approveTravel}
            cancelTravel={this.props.cancelTravel}
            show={this.state.show}
            editTravel={this.editTravel.bind(this)}
            removeTravel={this.props.removeTravel}
            addFlight={this.props.addFlight}
            addCar={this.props.addCar}
             />
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
    trips: state.TravelScreen.trips,
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
      addFlight: actions.addFlight,
      addCar: actions.addCar,
      getTrips : actions.getAllTrips,
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
  trips: PropTypes.arrayOf(PropTypes.shape({
    tripId: PropTypes.any,
    leavingDate: PropTypes.any,
    returningDate: PropTypes.any,
    leavingOffice: PropTypes.string,
    destinationOffice: PropTypes.string,
    employeeTrips: PropTypes.arrayOf(PropTypes.shape({
      employeeId: PropTypes.any,
      fullName: PropTypes.string,
      approved: PropTypes.bool,
      tripChecklist: PropTypes.shape({
        plainTickets : PropTypes.number,
        car: PropTypes.number,
        apartments: PropTypes.number,
      }),
    }))
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
    addFlight: PropTypes.func,
    addCar: PropTypes.func,
    getTrips: PropTypes.func,
};