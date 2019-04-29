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

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit ,
    width: 200,
  },
});

class CarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      price: 0,
      loading: true,
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
        address: props.employeeTrip.car_rent.address,
        price: props.employeeTrip.car_rent.price,
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
    this.props.onSubmit(this.props.id, { address: this.state.address, price: this.state.price });
  }

  render() {
    console.log(this.state)
    const { classes } = this.props;
    return (
      <Dialog
        open={true}
        onClose={this.props.onClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add car rent info</DialogTitle>
        <DialogContent>
          <TextField
            id="address"
            label="Address"
            className={classes.textField}
            value={this.state.address}
            type="text"
            margin="normal"
            onChange={this.inputChange.bind(this)}
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
CarForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CarForm);