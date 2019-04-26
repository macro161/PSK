import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class OfficeEditForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            city : '',
            address : '',
            accommodation:'',
            rooms: '',
        }
        this.state.city=this.props.office.city;
        this.state.address=this.props.office.address;
    }

    inputChange(e){
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    onEditSave(){
        this.props.onEditSave(this.props.office.id, this.state.city, this.state.address, this.state.accommodation, this.state.rooms);
    }

    render(){
        
        /*return(
            <div className="popup">
                <div className="popup-small">
                    <header className="form-header">
                        <span className="form-header-text">Edit office</span>
                        <span className="form-header-close" onClick={this.props.onClose}>✖</span>
                    </header>
                    <div className="form-container">
                        <TextField
                            id="city"
                            label="City"
                            defaultValue = {this.props.office.city}
                            className="form-text-field"
                            type="text"
                            margin="normal"
                            onChange={this.inputChange.bind(this)}
                            />
                            <br/>
                        <TextField
                            id="address"
                            label="Address"
                            defaultValue = {this.props.office.address}
                            className="form-text-field-wide"
                            type="text"
                            margin="normal"
                            onChange={this.inputChange.bind(this)}
                        />
                        <div className="register-form-buttons">
                        <Button variant="contained" size="large" color="primary" onClick={this.onEditSave.bind(this)}>
                        Save
                        </Button>
                            <Button variant="contained" size="large" color="secondary" className="cancel-button" onClick={this.props.onClose}>
                        Cancel
                        </Button>
                        </div>
                    </div>
                </div>
            </div>
        );*/
        return(
            <Dialog
            open={true}
            onClose={this.props.onClose}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit office</DialogTitle>
            <DialogContent>
                <TextField
                defaultValue = {this.props.office.city}
                  id="city"
                  label="City"
                  className="form-text-field-city"
                  type="text"
                  margin="normal"
                  onChange={this.inputChange.bind(this)}
                />
                <TextField
                defaultValue = {this.props.office.address}
                  id="address"
                  label="Address"
                  className="form-text-field-wide"
                  type="text"
                  margin="normal"
                  onChange={this.inputChange.bind(this)}
                />
                <TextField
                defaultValue = {this.props.office.aptAddress}
                  id="accommodation"
                  label="Accommodation"
                  className="form-text-field-wide"
                  type="text"
                  margin="normal"
                  onChange={this.inputChange.bind(this)}
                />
                <TextField
                defaultValue = {this.props.office.aptSize}
                  id="rooms"
                  label="Rooms"
                  className="form-text-field-rooms"
                  type="text"
                  margin="normal"
                  onChange={this.inputChange.bind(this)}
                />
                <div className="register-form-buttons">
                <Button variant="contained" size="large" color="primary" onClick={this.onEditSave.bind(this)}>
                Save
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