import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';




const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontSize: 25
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
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
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>Most common trip destination</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>{this.props.mostCommonTripDestination}</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>Most expensive flight</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>{this.props.mostExpensiveTripOrigin} - {this.props.mostExpensiveTripDestination}</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>Cheapest flight</Paper>
          </Grid>
          <Grid item xs={6}>
          <Paper className={classes.paper}>{this.props.cheapestTripOrigin} - {this.props.cheapestTripDestination}</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>Shortest trip</Paper>
          </Grid>
          <Grid item xs={6}>
          <Paper className={classes.paper}>{this.props.shortestTripOrigin} - {this.props.shortestTripDestination}</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>Longest trip</Paper>
          </Grid>
          <Grid item xs={6}>
          <Paper className={classes.paper}>{this.props.longestTripOrigin} - {this.props.longestTripDestination}</Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>Employee</Paper>
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="name"
              label="Name"
              className="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
              inputProps={{
                style: { fontSize: 22 }
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="surname"
              label="Surname"
              className="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
              inputProps={{
                style: { fontSize: 22 }
              }}
              />
          </Grid>
          <Grid item xs={1}>
            <Button size="large" variant="contained" color="primary" onClick={(e) => this.handleName(e)} className={classes.button}>
              OK
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>traveled</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>{this.props.employeeTripQuantity} times</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>Trips</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>from &nbsp;&nbsp;&nbsp;&nbsp;<TextField
              id="date1"
              label="Date"
              type="date"
              ref="date1"
              onChange={this.inputChange.bind(this)}
              defaultValue="2019-01-01"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            /></Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>to &nbsp;&nbsp;&nbsp;&nbsp;<TextField
              id="date2"
              label="Date"
              type="date"
              ref="date2"
              defaultValue="2019-01-01"
              onChange={this.inputChange.bind(this)}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />      &nbsp;&nbsp;&nbsp;&nbsp;<Button size="large" variant="contained" color="primary" onClick={(e) => this.handleDate(e)} className={classes.button}>
                OK
  </Button></Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>{this.props.periodTripQuantity}</Paper>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary"size="large" className={classes.button}>
        Export as PDF
      </Button>      <Button variant="contained" color="primary"size="large" className={classes.button}>
        Export as PNG
      </Button>
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