import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from 'react-router-dom';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  link: { 
    color: '#FFF',
    textDecoration: 'none' ,
    '&:hover': {
      color: '#fff',
      opacity: 1,
      textDecoration: 'none'
    }},
  color:{
      backgroundColor: '#4da6ff'
    }
  });

class HeaderTabs extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: 2,
    };
    this.handleChange = this.handleChange.bind(this)
  }
  

  handleChange (e, value) {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.color}>
          <Tabs value={value} onChange={this.handleChange}>
          <Tab label="My travels" 
                component={Link} 
                className={classes.link}
                to={'/admin-travels'}/>
            <Tab label="Offices" 
                component={Link} 
                className={classes.link}
                to={'/admin-offices'}/>
            <Tab label="Travels" 
                component={Link} 
                className={classes.link}
                to={'/admin'}/>
            <Tab label="Employees" 
                component={Link} 
                className={classes.link}
                to={'/admin-usermanager'}/>
            <Tab label="Statistics" 
                component={Link} 
                className={classes.link}
                to={'/admin-stats'}/>
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

HeaderTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderTabs);