import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';
import People from '@material-ui/icons/People';
import '../../css/bootstrap.css';

const AdminHeader = () => {
  return <header className="model-header">
  <br/>
    <Link to="/offices">
        <Button variant="contained" color="primary" className="header-image logo float-left inline" >
          Offices
          <Home className="float-left home-icon">send</Home>
        </Button> 
      </Link>

      <Link to="/usermanager">
        <Button variant="contained" color="primary" className="header-image logo float-left inline" >
          Employees
          <People className="float-left people-icon">send</People>
        </Button> 
      </Link>
    </header>;  
    
  };
  
  export default AdminHeader;
