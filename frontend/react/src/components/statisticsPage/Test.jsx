import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';



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

  constructor(props){
    super(props);
  }

  handle(e){
    console.log(e.target.value);
    this.props.getStatsByName(e.target.value);
  }
render(){
  const { classes } = this.props;
  return (
  <div className={classes.root}>
    <Grid container spacing={24}>
      <Grid item xs={6}>
        <Paper className={classes.paper}>Most trips were to</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>{this.props.cheapest}</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>The most expensive trip was</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>{this.props.mostExpensive}</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>The cheapest trip was</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>{this.props.cheapest}</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>The shortest trip was</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>{this.props.shortest}</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>The longest trip was</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>{this.props.longest}</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>How many times did</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>        
        <TextField
        id="outlined-bare"
        className={classes.textField}
        defaultValue="Name"
        margin="normal"
        variant="outlined"
        onBlur={(e) => this.handle(e)}
      /></Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>traveled</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>{this.props.travelCount}</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>Travels from<form className={classes.container} noValidate>
    <TextField
      id="date"
      label="Date"
      type="date"
      defaultValue="2017-05-24"
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
    />
  </form></Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>to<TextField
      id="date"
      label="Date"
      type="date"
      defaultValue="2017-05-24"
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
    /></Paper>
      </Grid>
    </Grid>
    
  </div>
);}
  
}

Test.propTypes = {
  classes: PropTypes.object.isRequired,
  mostTrips: PropTypes.string,
  mostExpensive: PropTypes.string,
  cheapest: PropTypes.string,
  shortest: PropTypes.string,
  longest: PropTypes.string,
  getStatsByName: PropTypes.func,
  travelCount: PropTypes.number
};

export default withStyles(styles)(Test);