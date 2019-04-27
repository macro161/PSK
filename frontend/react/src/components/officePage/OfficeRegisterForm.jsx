import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class OfficeRegisterForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            city : '',
            address : '',
            accommodation: '',
            rooms: ''
        }
    }

    inputChange(e){
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    onSubmit(){
        this.props.onSubmit(this.state.city, this.state.address, this.state.accommodation, this.state.rooms);
    }

    render(){
        return(
        <Dialog
        open={true}
        onClose={this.props.onClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register new office</DialogTitle>
        <DialogContent>
            <TextField
              id="city"
              label="City"
              className="form-text-field-city"
              type="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            <TextField
              id="address"
              label="Address"
              className="form-text-field-wide"
              type="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            <TextField
              id="accommodation"
              label="Accommodation"
              className="form-text-field-wide"
              type="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            <TextField
              id="rooms"
              label="Rooms"
              className="form-text-field-rooms"
              type="text"
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