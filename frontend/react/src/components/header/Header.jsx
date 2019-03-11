
import logo from '../../../public/logo.jpg';
import { Link } from 'react-router-dom';
import React from 'react';
import '../../css/bootstrap.css';
import Button from '@material-ui/core/Button';
import Exit from '@material-ui/icons/exitToApp';


const Header = () => {
  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img src={logo} width="50%" height="50%" class="d-inline-block align-top" alt=""/>
        </a>
      <Button variant="contained" color="primary" className="float-right button-size-header">
        Logout
        <Exit className="float-right exit-icon">send</Exit>
      </Button>

</nav>
    </div>
  )
};

export default Header;