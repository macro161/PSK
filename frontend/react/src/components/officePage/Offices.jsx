import React from 'react';
import OfficeList from './OfficeList';
import Button from '@material-ui/core/Button';
import OfficeRegisterForm from './OfficeRegisterForm';
import OfficeEditForm from './OfficeEditForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/Offices';



class Offices extends React.Component {
    
    constructor(props){
      super(props)
      this.state = {
        offices: [],
        showRegistration:false,
        showPopup:false,
      };

      this.props.getOffices();
    }

    addOfficeClick(){
      this.setState({
        showRegistration:true,
        showPopup:true,
      })
    }

    onClose(){
      this.setState({
        showRegistration: false,
        showEdit:false,
        showPopup:false,
      })
    }

    onEdit(office){
      this.setState({
        showRegistration:false,
        showEdit:true,
        showPopup: true,
        office: office,
      })
    }

    onEditSave(id, city, address, accommodation, rooms) {
      const office = Array.isArray(this.props.offices) && this.props.offices.find(o => o.id == id);
      this.props.editOffice(id,city,address,accommodation, rooms, office.version);
      this.setState({
        showEdit:false,
        showPopup:false
      })
    }

    onDelete(id){
      this.props.deleteOffice(id);
    }


    onSubmit(city, address, accommodation, rooms){
      this.props.registerOffice(city, address, accommodation, rooms);
      this.setState({
        showRegistration:false,
        showPopup:false,
      })
    }
    
  render() {
      return (
        <div className = "page-frame">
        <h2>Offices</h2>
          <Button variant ="contained" onClick={this.addOfficeClick.bind(this)}> Add office </Button>
          {this.state.showRegistration ? 
          <OfficeRegisterForm 
          onClose={this.onClose.bind(this)} 
          onSubmit={this.onSubmit.bind(this)}/> : null}
          <OfficeList offices={this.props.offices} 
          onEdit={this.onEdit.bind(this)}
          onDelete={this.onDelete.bind(this)}
          disabled={this.state.showPopup}/>
          {this.state.showEdit ? 
          <OfficeEditForm office = {this.state.office} 
          onClose={this.onClose.bind(this)} 
          onEditSave={this.onEditSave.bind(this)}
          /> : null}
          </div>
    );
  }	
}

export default connect(
  (state) => ({offices: state.Offices.offices}),
  (dispatch) => bindActionCreators(
    {
      getOffices: actions.getOffices,
      registerOffice: actions.registerOffice,
      editOffice: actions.editOffice,
      deleteOffice: actions.deleteOffice,
  }, dispatch))(Offices);

Offices.propTypes = {
  offices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    city: PropTypes.string,
    address: PropTypes.string,
    version: PropTypes.number
  })),
  getOffices: PropTypes.func,
  registerOffice: PropTypes.func,
  onEdit: PropTypes.func,
  deleteOffice: PropTypes.func,
  onEditSave: PropTypes.func,
  editOffice: PropTypes.func,
};