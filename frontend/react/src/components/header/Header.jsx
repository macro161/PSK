
import logo from '../../../public/logo.jpg';
import { Link } from 'react-router-dom';
import React from 'react';
import Button from '@material-ui/core/Button';
import Exit from '@material-ui/icons/exitToApp';


const Header = () => {
  return <header className="main-header">
    <Link className="float-left" to="/">
    <img className="header-image logo" src={logo} />
    </Link>
    <Button variant="contained" color="primary" className="float-right button-size-header">
      Logout
      <Exit className="float-right exit-icon">send</Exit>
    </Button>
  </header>;  
};

export default Header;