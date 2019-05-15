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
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

export default class TripPopup extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            wantsAccommodation: true,
            wantsCar: true,
            wantsTickets: true,
        }
        this.state.wantsAccommodation = !!this.props.trip.tripChecklist.apartments;
        this.state.wantsCar = !!this.props.trip.tripChecklist.car;
        this.state.wantsTickets = !!this.props.trip.tripChecklist.plainTickets;
        this.handleChange = this.handleChange.bind(this)
    }

    inputChange(e){
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    onSubmit(e){
        this.props.onApprovalSubmit(this.props.trip, this.state.wantsAccommodation, this.state.wantsCar, this.state.wantsTicets);
    }

    handleChange = (e, target) => {
        console.log(target)
        if(target== "wantsAccommodation")
            this.setState({wantsAccommodation: !this.state.wantsAccommodation})
        if(target== "wantsCar")
            this.setState({wantsCar: !this.state.wantsCar})
        if(target== "wantsTickets")
            this.setState({wantsTickets: !this.state.wantsTickets})
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
        <DialogTitle id="form-dialog-title">Your trip will include:</DialogTitle>
        <DialogContent>
        <FormControl component="fieldset">
                                <FormGroup>
                                <FormControlLabel
                                    control={
                                    <Switch
                                        checked={this.state.wantsAccommodation}
                                        onChange={event => this.handleChange(event, "wantsAccommodation")}
                                        value="wantsAccommodation"
                                    />
                                    }
                                    label="Accommodation"
                                />
                                <FormControlLabel
                                    control={
                                    <Switch
                                        checked={this.state.wantsCar}
                                        onChange={event => this.handleChange(event, "wantsCar")}
                                        value="wantsCar"
                                    />
                                    }
                                    label="Car"
                                />
                                <FormControlLabel
                                    control={
                                    <Switch
                                        checked={this.state.wantsTicets}
                                        onChange={event => this.handleChange(event, "wantsTickets")}
                                        value="wantsTickets"
                                    />
                                    }
                                    label="Plane Ticket"
                                />
                                </FormGroup>
                            </FormControl>
            <DialogActions>
            <Button onClick={this.onCloseEdit} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onSubmit.bind(this)} color="primary">
              Approve
            </Button>
          </DialogActions>
            </DialogContent>
      </Dialog>
                         
        );
    }
}