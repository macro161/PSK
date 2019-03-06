import React from 'react';
import logo from '../../../public/logo.jpg';
import {Link} from 'react-router-dom';


const Header = () => {
  return <header className="main-header">
    <Link to="/">
    <img className="header-image logo" src={logo} />
    </Link>
  </header>;  
};

export default Header;