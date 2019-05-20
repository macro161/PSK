import React from 'react';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import PlaneIcon from '@material-ui/icons/Flight';
import CarIcon from '@material-ui/icons/DirectionsCar';
import HotelIcon from '@material-ui/icons/Hotel'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  });
  

class ApprovalPopup extends React.Component{
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
        this.props.onApprovalSubmit(this.props.trip, this.state.wantsAccommodation, this.state.wantsCar, this.state.wantsTickets);
        this.props.onClose();
    }

    handleChange = (e, target) => {
        if(target== "wantsAccommodation")
            this.setState({wantsAccommodation: !this.state.wantsAccommodation})
        if(target== "wantsCar")
            this.setState({wantsCar: !this.state.wantsCar})
        if(target== "wantsTickets")
            this.setState({wantsTickets: !this.state.wantsTickets})
    }

    onCloseEdit = (e) =>{
        this.props.onClose();
    }

    render(){
        const { classes } = this.props;
        return(
            <Dialog
        open={true}
        onClose={this.props.onCloseEdit}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Do you want your trip to include:</DialogTitle>
        <DialogContent>
        <List className={classes.root} >
        <ListItem>
          <ListItemIcon>
            <HotelIcon />
          </ListItemIcon>
          <ListItemText primary="Accommodation" />
          <ListItemSecondaryAction>
            <Switch
              onChange={event => this.handleChange(event, "wantsAccommodation")}
              checked={this.state.wantsAccommodation}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CarIcon />
          </ListItemIcon>
          <ListItemText primary="Car" />
          <ListItemSecondaryAction>
            <Switch
              checked={this.state.wantsCar}
              onChange={event => this.handleChange(event, "wantsCar")}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PlaneIcon />
          </ListItemIcon>
          <ListItemText primary="Plane tickets" />
          <ListItemSecondaryAction>
            <Switch
              checked={this.state.wantsTickets}
              onChange={event => this.handleChange(event, "wantsTickets")}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
            <DialogActions>
            <Button onClick={this.onCloseEdit.bind(this)} color="primary">
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
export default withStyles(styles)(ApprovalPopup);