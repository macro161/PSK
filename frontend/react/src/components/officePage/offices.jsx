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
        showPopup:true,
        office:office,
      })
    }

    onEditSave(id,city,address){
        this.props.editOffice(id,city,address);
        this.setState({
          showEdit:false,
          showPopup:false
        })
    }

    onDelete(id){
      this.props.deleteOffice(id);
    }


    onSubmit(city, address){
      this.props.registerOffice(city, address);
      this.setState({
        showRegistration:false,
        showPopup:false,
      })
    }
    
  render() {
      return (
        <div className = "page-frame">
          <h2>Devbridge offices</h2>
          <hr/>
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
    address: PropTypes.string
  })),
  getOffices: PropTypes.func,
  registerOffice: PropTypes.func,
  onEdit: PropTypes.func,
  deleteOffice: PropTypes.func,
  onEditSave: PropTypes.func,
  editOffice: PropTypes.func,
};