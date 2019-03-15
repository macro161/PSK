import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const themeone = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: {
    useNextVariants: true,
  },
});

const themetwo = createMuiTheme({
  palette: {
    primary: red,
  },
  typography: {
    useNextVariants: true,
  },
});



export default class EmployeeDatarow extends React.Component {
  constructor(props) {
    super(props);
  }

  approve() {
    this.props.approveTravel(this.props.id);
  }

  cancel() {
    this.props.cancelTravel(this.props.id);
  }

  show(){
    this.props.showInfo(this.props.id);
  }

  render() {
    const className=this.props.show ? "hide": ""
    return (
      <tr>
        <td className="departureTime ">{this.props.departureTime}</td>
        <td><Button className={className} variant="contained" disabled={this.props.show} color="primary" >Plain tickets</Button></td>
        <td className="accomodation">{this.props.accomodation}</td>
        <td>{this.props.approved ?
          <MuiThemeProvider theme={themetwo}><Button className={className} variant="contained" color="primary" disabled={this.props.show} onClick={this.cancel.bind(this)}>Cancel</Button></MuiThemeProvider>
          :
          <MuiThemeProvider theme={themeone}><Button className={className} variant="contained" color="primary" disabled={this.props.show} onClick={this.approve.bind(this)}>Approve</Button></MuiThemeProvider>
        }</td>
        <td><Button variant="contained" color="primary" disabled={this.props.show} onClick={this.show.bind(this)} >Info</Button></td>

      </tr>
    );
  }
}

EmployeeDatarow.propTypes = {
  id: PropTypes.string.isRequired,
  departureTime: PropTypes.string.isRequired,
  accomodation: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  approved: PropTypes.bool.isRequired,
  approveTravel: PropTypes.func.isRequired,
  cancelTravel: PropTypes.func.isRequired,
  showInfo: PropTypes.func.isRequired
};