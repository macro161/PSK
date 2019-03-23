import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/home';
import Flight from '@material-ui/icons/flight';
import People from '@material-ui/icons/people';
import Chart from '@material-ui/icons/equalizer';
import '../../css/bootstrap.css';

const OrgHeader = () => {
  return <header className="modal-header">
      <Link to="/offices">
        <Button variant="contained" color="primary" className="header-image logo float-left" >
          Offices
          <Home className="float-left home-icon">send</Home>
        </Button> 
      </Link>

      <Link to="/travels">
        <Button variant="contained" color="primary" className="header-image logo float-left" >
          Travels
          <Flight className="float-left flight-icon">send</Flight>
        </Button> 
      </Link>

      <Link to="/usermanager">
        <Button variant="contained" color="primary" className="header-image logo float-left" >
          Employees
          <People className="float-left people-icon">send</People>
        </Button> 
      </Link>

      <Link to="/stats">
        <Button variant="contained" color="primary" className="header-image logo float-left" >
          Statistics
          <Chart className="float-left chart-icon">send</Chart>
        </Button> 
      </Link>
    </header>;  
  };
  
  export default OrgHeader;