import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default class UserRegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: this.props.fullName,
      city: this.props.city,
      email: this.props.Contactemail,
      password1: "",
      password2: "",
      onClose: this.props.onClose,
      error: false,
    };
    
  }

  inputChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  onSubmit() {
    this.setState({ error: false });
    this.state.password1 == this.state.password2 ?
      this.props.onSubmit(this.state.fullName, this.state.city, this.state.email, this.state.password1)
      : this.setState({ error: true });
  }

  render() {
    return (
      <Dialog
        open={true}
        onClose={this.props.onClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register new employee</DialogTitle>
        <DialogContent>
            <TextField
              id="fullName"
              label="Full name"
              className="form-text-field"
              type="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            &nbsp;&nbsp;&nbsp;
            <TextField
              id="city"
              label="City"
              className="form-text-field-city"
              type="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            <TextField
              id="email"
              label="Email address"
              className="form-text-field-email"
              type="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            <TextField
              error={this.state.error}
              id="password1"
              name="password1"
              label="Password"
              className="form-text-field"
              type="password"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
              error={this.state.error}
              id="password2"
              name="password2"
              label="Repeat password"
              className="form-text-field"
              type="password"
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

UserRegistrationForm.propTypes = {
  fullName: PropTypes.any,
  city: PropTypes.any,
  email: PropTypes.any,
  onClose: PropTypes.any,
  onSubmit: PropTypes.any,
};

UserRegistrationForm.defaulProps = {
  fullName: '',
  city: '',
  email: '',
};