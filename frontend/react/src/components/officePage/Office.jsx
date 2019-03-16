import React from 'react';
import navicon from '../../../../images/navicon.png';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export default class Office extends React.Component {
    constructor(props){
        super(props);
        this.state={
          showEdit:false,
          office:this.props.office,
        }

    }

    editItem(){
      this.props.onEdit(this.office);
    } 

    deleteItem(){

    }

    render() {
    
      return (
        <div className="list">
          <span><img src={navicon} width={70} className="icon"/></span>
          <span className="info">
            <div className="city">{this.props.office.city}</div>
            <div className="address">{this.props.office.address}</div>
          </span>
          <span>
              <IconButton aria-label="Edit" color="primary" onClick = {this.editItem.bind(this)}>
            <EditIcon />
          </IconButton>
            <IconButton aria-label="Delete" color="secondary" onClick = {this.deleteItem.bind(this)} >
            <DeleteIcon />
          </IconButton>
            </span>
        </div>
      );
    }
    }