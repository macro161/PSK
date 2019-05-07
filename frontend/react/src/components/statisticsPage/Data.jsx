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
      dateOne: "2000-01-01",
      dateTwo: "2000-01-01"
   }
  }



  handle(e) {
    this.props.getStatsByName(e.target.value);
  }

  handleChangeOne(e){
    this.setState({dateOne: e.target.value,});
  }

  handleChangeTwo(e){
    this.setState({dateTwo: e.target.value})
  }

  handleDate(e) {
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
          <Grid item xs={3}>
            <Paper className={classes.paper}>How many times did</Paper>
          </Grid>
          <Grid item xs={3}>

            <TextField
              id="standard-dense"
              label="Name"
              className="text"
              margin="normal"
              onBlur={(e) => this.handle(e)}
              inputProps={{
                style: { fontSize: 22 }
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>traveled</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>{this.props.employeeTripQuantity} times</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>Travels from</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}><TextField
              id="date1"
              label="Date"
              type="date"
              ref="date1"
              onChange={(e) => this.handleChangeOne(e)}
              defaultValue="2017-05-24"
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
              defaultValue="2017-05-24"
              onChange={(e) => this.handleChangeTwo(e)}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />      &nbsp;&nbsp;&nbsp;&nbsp;<Button size="large" variant="contained" color="primary" onClick={(e) => this.handleDate(e)} className={classes.button}>
                OK
  </Button></Paper>
          </Grid>

          <Grid item xs={2}>
            <Paper className={classes.paper}>25 travels</Paper>
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