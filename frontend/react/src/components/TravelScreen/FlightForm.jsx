import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';
import DateFnsUtils from "@date-io/date-fns"; 
import { DateTimePicker, MuiPickersUtilsProvider,} from "@material-ui/pickers";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class FlightForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: '',
      airport: '',
      loading: true,
      date: "2019-06-30T12:00",
      price: 0,

    }
  }

  componentWillReceiveProps(props) {
    if (props.employeeTrip == {}) {
      return;
    }
    if (props.employeeTrip.id.tripId == 0) {
      this.setState({
        loading: false,
      })
    } else if (props.employeeTrip.id.tripId == props.id.tripId && props.employeeTrip.id.employeeId) {
      this.setState({
        booking: props.employeeTrip.flight.booking,
        airport:props.employeeTrip.flight.airport,
        date: props.employeeTrip.flight.date.substring(0, 16),
        price: props.employeeTrip.flight.price,
        loading: false,
      });
      }
  }

  inputChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  handleChangeDate(e) {
    this.setState({
    date: e,
  })
}
  onSubmit() {
    this.props.onSubmit(this.props.id, { airport : this.state.airport, date : this.state.date, price: this.state.price, booking:this.state.booking });
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={true}
        onClose={this.props.onClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add hotel</DialogTitle>
        <DialogContent>
          <TextField
            id="airport"
            label="Airport"
            value={this.state.airport}
            className={classes.textField}
            type="text"
            margin="normal"
            onChange={this.inputChange.bind(this)}
          />
          <MuiPickersUtilsProvider className={classes.textField} utils={DateFnsUtils}>
            <DateTimePicker
              className={classes.textField}
              value={this.state.date}
              onChange={this.handleChangeDate.bind(this)}
              label="Flight time"
               showTodayButton/>
            </MuiPickersUtilsProvider>
          <TextField
          id="booking"
          label="Booking"
          value={this.state.booking}
          onChange={this.inputChange.bind(this)}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
          <TextField
          id="price"
          label="Price"
          value={this.state.price}
          onChange={this.inputChange.bind(this)}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
          margin="normal"
        />
          <div className="register-form-buttons">
            <Button variant="contained" size="large" color="primary" onClick={this.onSubmit.bind(this)}>
              Register
            </Button>
            <Button variant="contained" size="large" color="secondary" className="cancel-button" onClick={this.props.onClose}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}
FlightForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlightForm);