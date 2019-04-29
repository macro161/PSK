import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

class Spinner extends React.Component {
  render() {
    return (this.props.loading ?
      <Dialog
      disableBackdropClick = {true}
      disableEscapeKeyDown
        open={true}
        fullWidth={true}
        fullScreen={true}>
    <DialogContent>
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
        </DialogContent>
      </Dialog> : null
    );
  }

}
export default connect(
  (state) => ({
    loading: state.TravelScreen.loading,
  }), null, null)(Spinner);

Spinner.propTypes = {
  loading: PropTypes.bool,
};