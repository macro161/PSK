import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';

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
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class AccomodationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      officeApartments: false,
      roomNo: 0,
      loading: true,
      hotelName: '',
      hotelAddress: '',
      hotelPrice: 0,
      hotelRoomNumber: 0,
    }
  }
  componentWillReceiveProps(props) {
    console.log(this.props)
    if (props.employeeTrip == {}) {
      return;
    }
    if (props.employeeTrip.id.tripId == 0) {
      this.setState({
        loading: false,
      })
    } else if (props.employeeTrip.apartments_room != null) {
      this.setState({
        officeApartments: true,
        roomNo: props.employeeTrip.apartments_room.roomNo,
        loading: false,
      });
    }
    else if (props.employeeTrip.hotel != null) {
      this.setState({
        hotelName: props.employeeTrip.hotel.name,
        hotelAddress: props.employeeTrip.hotel.address,
        hotelPrice: props.employeeTrip.hotel.price,
        hotelRoomNumber: props.employeeTrip.hotel.roomNo,
        loading: false,
      });
    }
  }
  inputChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  onSubmit() {
    this.props.onSubmit(this.props.id, {name:this.state.hotelName, address:this.state.hotelAddress, price:this.state.hotelPrice, roomNo:this.state.hotelRoomNumber});
  }

  render() {
    console.log(this.state)
    const { classes } = this.props;
    return (

      <Dialog
        open={true}
        onClose={this.props.onClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add accomodation</DialogTitle>
        <DialogContent>
          {this.state.officeApartments ? <h4>Room number {this.state.roomNo} is reservated for this employee at office apartments</h4> : null}
              <TextField
                id="hotelName"
                label="Hotel name"
                className={classes.textField}
                value={this.state.hotelName}
                type="text"
                margin="normal"
                onChange={this.inputChange.bind(this)}
              />
              <TextField
                id="hotelAddress"
                label="Address"
                className={classes.textField}
                value={this.state.hotelAddress}
                type="text"
                margin="normal"
                onChange={this.inputChange.bind(this)}
              />
              <TextField
                id="hotelPrice"
                label="Price"
                value={this.state.hotelPrice}
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
              <TextField
                id="hotelRoomNumber"
                label="Room number"
                className={classes.textField}
                value={this.state.hotelRoomNumber}
                type="number"
                margin="normal"
                onChange={this.inputChange.bind(this)}
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
AccomodationForm.propTypes = {
  classes: PropTypes.object.isRequired,
  employeeTrips: PropTypes.any,
};

export default withStyles(styles)(AccomodationForm);