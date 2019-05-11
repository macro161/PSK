import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class TripPopup extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            wantsAccommodation: true,
            wantsCar: true,
            wantsTicets: true,
        }
        this.state.wantsAccommodation = this.props.travel.wantsAccommodation;
        this.state.wantsCar = this.props.travel.wantsCar;
        this.state.wantsTickets = this.props.travel.wantsTickets;
    }

    inputChange(e){
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    onEditSave(){
        this.props.onEditSave(this.props.travel, this.state.fullName, this.state.departureTime, this.state.accomodation, this.state.city, false);
        //this.props.travel.id, this.props.travel.approved
    }

    render(){
        return(
            <div className="popup">
                <div className="popup_inner">
                    <header className="form-header">
                        <span className="form-header-text">Edit travel</span>
                        <span className="form-header-close" onClick={this.props.onClose}>✖</span>
                    </header>
                    <div className="form-container">
                         <FormControl component="fieldset">
                                <FormLabel component="legend">Your trip will include:</FormLabel>
                                <FormGroup>
                                <FormControlLabel
                                    control={
                                    <Switch
                                        checked={this.state.wantsAccommodation}
                                        onChange={this.handleChange('wantsAccommodation')}
                                        value="wantsAccommodation"
                                    />
                                    }
                                    label="Accommodation"
                                />
                                <FormControlLabel
                                    control={
                                    <Switch
                                        checked={this.state.wantsCar}
                                        onChange={this.handleChange('wantsCar')}
                                        value="wantsCar"
                                    />
                                    }
                                    label="Car"
                                />
                                <FormControlLabel
                                    control={
                                    <Switch
                                        checked={this.state.wantsTicets}
                                        onChange={this.handleChange('wantsTickets')}
                                        value="wantsTickets"
                                    />
                                    }
                                    label="Plane Ticket"
                                />
                                </FormGroup>
                                <FormHelperText>Be careful</FormHelperText>
                            </FormControl>
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
        );
    }
}