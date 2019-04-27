import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import logo from '../../../public/logo.png';
import Tabs from './HeaderTabs.jsx'

const styles = {
  root: {flexGrow: 1},
  grow: {flexGrow: 1,},
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  color:{
    backgroundColor: '#4da6ff'
  }
};

class AdminHeader extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      auth: true,
      anchorEl: null,
    };
    this.handleMenu = this.handleMenu.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  
  handleChange (event){
    this.setState({ auth: event.target.checked });
  };

  handleMenu (event) {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose () {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.color}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link to="/">
      <img className="header-image back" src={logo} width = "18%"/>   
    </Link>
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
          <Tabs/>
        </AppBar>
      </div>
    );
  }
}

AdminHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminHeader);
