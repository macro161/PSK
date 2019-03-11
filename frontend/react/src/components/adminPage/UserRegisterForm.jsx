import React from 'react';
import PropTypes from 'prop-types';

export default class UserRegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      surname: this.props.surname,
      city: this.props.city,
      email: this.props.Contactemail,
      password : "",
      onClose: this.props.onClose,
    };
  }

  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit() {
    this.props.onSubmit(this.props.name, this.props.surname, this.props.city, this.props.email);
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <header className="form-header">
            <span className="form-header-text">Register new employee</span>
            <span className="form-header-close" onClick={this.props.onClose}>✖</span>
          </header>
        </div>
      </div>
    );
  }
}

UserRegistrationForm.propTypes = {
  name: PropTypes.any,
  surname: PropTypes.any,
  city: PropTypes.any,
  email: PropTypes.any,
  onClose: PropTypes.any,
  onSubmit: PropTypes.any,
};

UserRegistrationForm.defaulProps = {
  name: '',
  surname: '',
  city: '',
  email: '',
};