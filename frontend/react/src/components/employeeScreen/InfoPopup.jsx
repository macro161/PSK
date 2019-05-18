import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

export default class InfoPopup extends React.Component{
    constructor(props){
        super(props);
    }

    onCloseEdit = (e) =>{
        this.props.onCloseEdit();
    }

    render(){
        return(
            <Dialog
        open={true}
        onClose={this.props.onCloseEdit}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Information about your trip</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
              {this.props.trip.aptRoom}
            </DialogContentText>
            <DialogActions>
            <Button onClick={this.onClose} color="primary">
              OK
            </Button>
          </DialogActions>
            </DialogContent>
      </Dialog>
                         
        );
    }
}