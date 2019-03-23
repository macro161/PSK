import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/OrgScreen';
import DataTable from './OrgDataTable';
import InfoScreen from  '../employeeScreen/InfoScreen';

const initialState = {
    departureTime : '',
    accomodation : '',
    city : '',
    show: false
  };
class OrgScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.props.getAllTravels(1);
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
        <div>
            {this.state.show ? <InfoScreen onClose={this.onClose.bind(this)} /> : null}
        </div>
        <DataTable 
            travels={this.props.travels}
            approveTravel={this.props.approveTravel}
            cancelTravel={this.props.cancelTravel}
            showInfo={this.showInfo.bind(this)}
            show={this.state.show}
            removeTravel={this.props.removeTravel}
            /> 
      </div>
    );
  }
}

export default connect(
  (state) => ({travels: state.OrgScreen.travels}),
  (dispatch) => bindActionCreators(
    {
        getAllTravels: actions.getAllTravels,
        approveTravel: actions.approveTravel,
        cancelTravel: actions.cancelTravel,
        removeTravel: actions.removeTravel,
  }, dispatch))(OrgScreen);

OrgScreen.propTypes = {
  travels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
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
    removeTravel: PropTypes.func,
};