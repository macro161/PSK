import Office from '../officePage/Office';
import React from 'react';


export default class OfficeList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      offices: this.props.offices,
    }
  }

  onEdit(office){
    this.props.onEdit(office);
  } 
  onDelete(id){
    this.props.onDelete(id);
  } 

  render(){
    return (
    <div>
      {this.props.offices.map(office => <Office office={office} 
      onEdit={this.onEdit.bind(this)}
      onDelete={this.onDelete.bind(this)}
      disabled={this.props.disabled}/>)}
    </div>
  );}
}

    