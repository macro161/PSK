import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class Test extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      date1: '2019-01-01',
      date2: '2019-01-01'
    }
  }



  handleName(e) {
    this.props.getStatsByName(this.state.name + "_" + this.state.surname)
  }

  handleDate(e) {
    console.log(this.state.date1)
    console.log(this.state.date2)
    this.props.getStatsByDate(this.state.date1, this.state.date2)
  }

  inputChange(e) {
    this.setState({
        [e.target.id]: e.target.value,
    });
}

  render() {
    const { classes } = this.props;
    
    return(
      <div className='page-frame'>
        <title>Statistics</title>
        <h2>Statistics</h2>
        <hr />
        <br/>
      <Grid container spacing={2}>
      <Grid item xs={5}>
      <h3>All travels</h3>
      <List className={classes.root}>
        <ListItem>
    <ListItemText primary="Most common trip destination:" secondary={<h1>{this.props.mostCommonTripDestination}</h1>} />
        </ListItem>
        <hr/>
          <ListItem>
            <ListItemText primary="Most expensive flight:" secondary={<h1>{this.props.mostExpensiveTripOrigin} - {this.props.mostExpensiveTripDestination}</h1>} />
          </ListItem>
          <hr/>
          <ListItem>
           <ListItemText primary="Cheapest flight:" secondary={<h1>{this.props.cheapestTripOrigin} - {this.props.cheapestTripDestination}</h1>} />
          </ListItem>
          <hr/>
          <ListItem>
          <ListItemText primary="Shortest trip:" secondary={<h1>{this.props.shortestTripOrigin} - {this.props.shortestTripDestination}</h1>} />
          </ListItem>
          <hr/>
          <ListItem>
          <ListItemText primary="Longest trip:" secondary={<h1>{this.props.longestTripOrigin} - {this.props.longestTripDestination}</h1>} />
          </ListItem>
          </List>
          </Grid>


          <Grid spacing={3}>
            <h3>Employee travels</h3>
            <List>
          <ListItem>
            <Grid container spacing={24}>
            <Grid item xs={6}>
            <TextField
              id="name"
              label="First name"
              className="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
              inputProps={{
                style: { fontSize: 22 }
              }}
            /></Grid>
            <Grid item xs={6}>
            <TextField
              id="surname"
              label="Last name"
              className="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
              inputProps={{
                style: { fontSize: 22 }
              }}
              /></Grid></Grid>
              
              <Button size="medium" variant="contained" color="primary" onClick={(e) => this.handleName(e)} className={classes.button}>
              OK
            </Button>
          </ListItem>
          <ListItem>
            
          </ListItem>
          <ListItem>
            Employee travelled {this.props.employeeTripQuantity} times in total.
          </ListItem>
          <br/>


          <h3>Select a time period</h3>
          <ListItem>
            
          <ListItemText primary={
          <Grid container spacing={24}>
            <Grid item xs={6}>
            <TextField
              id="date1"
              label="From"
              type="date"
              ref="date1"
              onChange={this.inputChange.bind(this)}
              defaultValue="2019-01-01"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            /></Grid>
            <Grid item xs={6}><TextField
            id="date2"
            label="To"
            type="date"
            ref="date2"
            defaultValue="2019-01-01"
            onChange={this.inputChange.bind(this)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          /></Grid></Grid>} />
          <Button size="medium" variant="contained" color="primary" onClick={(e) => this.handleDate(e)} className={classes.button}>
          OK
      </Button>
          </ListItem>
          <br/>
          <ListItem>
            Travels during selected time period: {this.props.periodTripQuantity}
          </ListItem>
      </List>
      </Grid>
      </Grid>
      </div>
    );
  }

}

Test.propTypes = {
  classes: PropTypes.object.isRequired,
  mostCommonTripDestination: PropTypes.string,
  mostExpensiveTripOrigin: PropTypes.string,
  mostExpensiveTripDestination: PropTypes.string,
  cheapestTripOrigin: PropTypes.string,
  cheapestTripDestination: PropTypes.string,
  shortestTripOrigin: PropTypes.string,
  shortestTripDestination: PropTypes.string,
  longestTripOrigin: PropTypes.string,
  longestTripDestination: PropTypes.string,
  employeeTripQuantity: PropTypes.number,
  periodTripQuantity: PropTypes.number,
};

export default withStyles(styles)(Test);