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
import { CSVLink } from "react-csv";

const initialState = {
  fullName: '',
  departureTime: '',
  returningTime: '',
  city: '',
  approved: false,
  showEdit: false,
  showRegister: false,

};

const CSVStyle = {
  color: "white",
  textDecoration: "none"
};

class TravelScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.props.getOffices();
    this.props.getAllEmployees();
    this.props.getTrips();
    this.props.getCsvData();
    this.getTodaysFilename = this.getTodaysFilename.bind(this)
  }

  onClose() {
    this.setState(initialState)
  }

  editTravel(travel) {
    this.setState({
      showEdit: true,
      travel: travel,
    })
  }

  onEditSave(id, fullName, departure, accommodation, city, approved) {
    this.props.editTravel(id, fullName, departure, accommodation, city, approved);
    this.setState(initialState)
  }

  onSubmit(employee, leavingDate, returningDate, fromOffice, toOffice, tripChecklist) {
    this.props.registerTravel(this.props.user.id, employee, leavingDate, returningDate, fromOffice, toOffice, tripChecklist);
    this.setState(initialState)
  }

  removeTravel(id) {
    this.props.removeTravel(id);
  }

  addTravelClick() {
    this.setState({
      showRegister: true
    })
  }

  getTodaysFilename(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    return "Travels_" + today +".csv";
  }

  render() {
    return (
      <div className='page-frame'>
        <title>Travels</title>
        <h2>Organise travels</h2>
        <hr />
        <div>
          <Button onClick={this.addTravelClick.bind(this)} className="register-travel-button" variant="contained" color="secondary"> Add travel </Button>
          <Button style={{ float: "right" }} variant="contained" color="primary"><CSVLink style={CSVStyle} className="button button--primary button--spaced admin__action" data={this.props.csvData} filename={this.getTodaysFilename()}>
                    Download as CSV
                </CSVLink></Button>
        </div>
        <DataTable
          trips={this.props.trips}
          approveTravel={this.props.approveTravel}
          cancelTravel={this.props.cancelTravel}
          show={this.state.show}
          editTravel={this.editTravel.bind(this)}
          removeTrip={this.props.removeTrip}
          addFlight={this.props.addFlight}
          addCar={this.props.addCar}
          addHotel={this.props.addHotel}
          groupTrips={this.props.groupTrips}
          organiser={this.props.user}
          getEmployeeTrip={this.props.getEmployeeTrip}
          employeeTrip={this.props.employeeTrip}
          clearEmployeeTrip={this.props.clearEmployeeTrip}
        />
        {this.state.showEdit ?
          <EditForm travel={this.state.travel}
            onEditSave={this.onEditSave.bind(this)}
            onClose={this.onClose.bind(this)}
          /> : null}
        {this.state.showRegister ?
          <RegisterForm
            getEmployeeCalendar={this.props.getEmployeeCalendar}
            calendar={this.props.calendar}
            onClose={this.onClose.bind(this)}
            onSubmit={this.onSubmit.bind(this)}
            employees={this.props.employees}
            offices={this.props.offices} /> : null}
        <br /><br />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    trips: state.TravelScreen.trips,
    csvData: state.TravelScreen.csvData,
    employees: state.UserManager.employees,
    offices: state.Offices.offices,
    employeeTrip: state.TravelScreen.employeeTrip,
    calendar: state.TravelScreen.calendar,
    user: state.User.userInfo,
  }),
  (dispatch) => bindActionCreators(
    {
      getAllEmployees: getAllEmployees,
      getCsvData: actions.getCsvData,
      getOffices: getOffices,
      getAllTravels: actions.getAllTravels,
      approveTravel: actions.approveTravel,
      cancelTravel: actions.cancelTravel,
      editTravel: actions.editTravel,
      removeTravel: actions.removeTravel,
      registerTravel: actions.registerTravel,
      getAllEmployeeTrips: actions.getAllEmployeeTrips,
      addFlight: actions.addFlight,
      addCar: actions.addCar,
      addHotel: actions.addHotel,
      getTrips: actions.getAllTrips,
      groupTrips: actions.groupTrips,
      getEmployeeTrip: actions.getEmployeeTrip,
      clearEmployeeTrip:actions.clearEmployeeTrip,
      getEmployeeCalendar: actions.getEmployeeCalendar,
      removeTrip: actions.removeTrip,
    }, dispatch))(TravelScreen);

TravelScreen.propTypes = {
  employeeTrips: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    fullName: PropTypes.string,
    leavingDate: PropTypes.string,
    returningDate: PropTypes.string,
    leavingOffice: PropTypes.string,
    destinationOffice: PropTypes.string,
    approved: PropTypes.bool,
    tripChecklist: PropTypes.shape({
      plainTickets: PropTypes.number,
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
        plainTickets: PropTypes.number,
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
    fullName: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
  })),
  employeeTrip: PropTypes.any,
  show: PropTypes.bool,
  getAllTravels: PropTypes.func,
  getCsvData: PropTypes.func,
  approveTravel: PropTypes.func,
  cancelTravel: PropTypes.func,
  seeTravelDetails: PropTypes.func,
  editTravel: PropTypes.func,
  removeTravel: PropTypes.func,
  registerTravel: PropTypes.func,
  getAllEmployeeTrips: PropTypes.func,
  addFlight: PropTypes.func,
  addCar: PropTypes.func,
  addHotel: PropTypes.func,
  getTrips: PropTypes.func,
  groupTrips: PropTypes.func,
  getEmployeeTrip: PropTypes.func,
  clearEmployeeTrip: PropTypes.func,
  calendar: PropTypes.any,
  getEmployeeCalendar: PropTypes.func,
  removeTrip: PropTypes.func,
  user: PropTypes.any,
};