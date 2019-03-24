import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';


export default class OrgRegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name: this.props.name,
        surname: this.props.surname,
        departureTime: this.props.departureTime,
        accommodation: this.props.accommodation,
        city: this.props.city,
        onClose: this.props.onClose,
    };
    
  }

  inputChange(e) {
    console.log(e.target.id + " " + e.target.value);
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  onSubmit() {
      this.props.onSubmit(Math.floor(Math.random()*10000).toString(), this.state.name, this.state.surname, this.state.departureTime, this.state.accommodation, this.state.city, true);
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <header className="form-header">
            <span className="form-header-text">Register new travel</span>
            <span className="form-header-close" onClick={this.props.onClose}>✖</span>
          </header>
          <div className="form-container">
            <TextField
              id="name"
              label="Name"
              className="form-text-field"
              type="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <TextField
              id="surname"
              label="Surname"
              className="form-text-field"
              type="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            <TextField
              id="departureTime"
              label="Departure time"
              className="form-text-field-email"
              type="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            <TextField
              error={this.state.error}
              id="accommodation"
              label="Accommodation"
              className="form-text-field"
              type="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />        
            <TextField
              id="city"
              label="City"
              className="form-text-field-city"
              type="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="register-form-buttons">
            <Button variant="contained" size="large" color="primary" onClick={this.onSubmit.bind(this)}>
            Register
            </Button>
            <Button variant="contained" size="large" color="secondary" className="cancel-button" onClick={this.props.onClose}>
            Cancel
            </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OrgRegisterForm.propTypes = {
  name: PropTypes.any,
  surname: PropTypes.any,
  departureTime: PropTypes.any,
  accommodation: PropTypes.any,
  city: PropTypes.any,
  onClose: PropTypes.any,
  onSubmit: PropTypes.any,
};

OrgRegisterForm.defaulProps = {
  name: '',
  surname: '',
  departureTime: '',
  accommodation:'',
  city: '',
};