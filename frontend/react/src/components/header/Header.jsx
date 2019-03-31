
import logo from '../../../public/logo.png';
import { Link } from 'react-router-dom';
import React from 'react';
import '../../css/bootstrap.css';
import Button from '@material-ui/core/Button';
import Exit from '@material-ui/icons/ExitToApp';



const Header = () => {
  return <header className="main-header">
    <Link to="/">
      <img className="header-image back" src={logo} width = "18%"/>   
    </Link>
    <Button variant="contained" color="primary" className="header-image logo float-right" >
      Logout
      <Exit className="float-right exit-icon">send</Exit>
    </Button>
    <hr className="grey-line"/>
  </header>;  
};

export default Header;
