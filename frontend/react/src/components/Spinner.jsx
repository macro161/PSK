import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Spinner extends React.Component {
  render() {
    return (this.props.loading ?
      <div className='popup'>
        <div className='spinner-container'>
          <div className="spinner">
            <div className="circle-outter">
            </div>
            <div className="circle-inner" />
          </div>
          <div>
            <span>Loading...</span>
          </div>
        </div>
      </div> : null
    );
  }

}
export default connect(
  (state) => ({
    loading: state.sites.loading,
  }), null, null)(Spinner);

Spinner.propTypes = {
  loading: PropTypes.bool,
};