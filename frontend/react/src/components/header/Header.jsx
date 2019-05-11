
import logo from '../../../public/logo.png';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import '../../css/bootstrap.css';
import Button from '@material-ui/core/Button';
import Exit from '@material-ui/icons/ExitToApp';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/login';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

export class Header extends Component {
  logout() {
    console.log('logging out');
    this.props.logout();
  }

  render() {
    if (this.props.logoutSuccess) {
      return <Redirect to='/login' />;
    }

    return <header className="main-header">
      <Link to="/">
        <img className="header-image back" src={logo} width = "18%"/>
      </Link>
      <Button variant="contained" color="primary" className="header-image logo float-right" onClick={this.logout.bind(this)}>
        Logout
        <Exit className="float-right exit-icon">send</Exit>
      </Button>
      <hr className="grey-line"/>
    </header>;
  }
};

export default connect(
  (state) => ({
      errorCode: state.Logout.errorCode,
      logoutSuccess: state.Logout.success,
  }),
  (dispatch) => bindActionCreators({
      logout: actions.Logout,
  }, dispatch))(Header);

Header.propTypes = {
  errorCode: PropTypes.number,
  logoutSuccess: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};