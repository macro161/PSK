import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/TravelScreen';
import DataTable from './TravelDataTable';
import InfoScreen from '../employeeScreen/InfoScreen';
import EditForm from './TravelEditForm';
import RegisterForm from './TravelRegisterForm';
import Button from '@material-ui/core/Button';

const initialState = {
    name: '',
    surname: '',
    departureTime : '',
    accomodation : '',
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

  onEditSave(id, name, surname, departure, accommodation, city, approved){
    this.props.editTravel(id, name, surname, departure, accommodation, city, approved);
    this.setState(initialState)
  }
  
  onSubmit(id, name, surname, departure, accommodation, city, approved){
    this.props.registerTravel(id, name, surname, departure, accommodation, city, approved);
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
        <h2>Org travels</h2>
          <hr/>
          <Button variant ="contained" onClick={this.addTravelClick.bind(this)} className="register-travel-button" variant="contained" color="secondary"> Add travel </Button>
        <div>
            {this.state.show ? <InfoScreen onClose={this.onClose.bind(this)} /> : null}
        </div>
        <DataTable 
            travels={this.props.travels}
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
            onSubmit={this.onSubmit.bind(this)}/> : null}
      </div>
    );
  }
}

export default connect(
  (state) => ({travels: state.TravelScreen.travels}),
  (dispatch) => bindActionCreators(
    {
        getAllTravels: actions.getAllTravels,
        approveTravel: actions.approveTravel,
        cancelTravel: actions.cancelTravel,
        editTravel: actions.editTravel,
        removeTravel: actions.removeTravel,
        registerTravel: actions.registerTravel,
  }, dispatch))(TravelScreen);

TravelScreen.propTypes = {
  travels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.string,
    departureTime: PropTypes.string,
    accomodation: PropTypes.string,
    city: PropTypes.string,
    approved: PropTypes.bool,
  })),
    show: PropTypes.bool,
    getAllTravels: PropTypes.func,
    approveTravel: PropTypes.func,
    cancelTravel: PropTypes.func,
    seeTravelDetails: PropTypes.func,
    editTravel: PropTypes.func,
    removeTravel: PropTypes.func,
    registerTravel: PropTypes.func,
};