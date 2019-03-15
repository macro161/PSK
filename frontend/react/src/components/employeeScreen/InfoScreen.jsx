import React from 'react';
import PropTypes from 'prop-types';

export default class InfoScreen extends React.Component {
  constructor(props) {
    super(props);  
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <header className="form-header">
            <span className="form-header-text">Detailed information</span>
            <span className="form-header-close" onClick={this.props.onClose}>✖</span>
          </header>
        </div>
      </div>
    );
  }
}

InfoScreen.propTypes = {
  onClose: PropTypes.any,
};

