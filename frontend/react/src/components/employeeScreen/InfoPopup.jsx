import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
};

class InfoPopup extends React.Component{
    constructor(props){
        super(props);
    }

    onClose = (e) =>{
        this.props.onClose();
    }

    render(){
      const { classes } = this.props;
        return(
            <Dialog
            maxWidth={"sm"}
            fullWidth={true}
        open={true}
        onClose={this.props.onCloseEdit}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Information about your trip</DialogTitle>
        <DialogContent>
        
        <List style={flexContainer}>
        <ListItem>
          <ListItemText  primary="Leaving office" secondary={this.props.trip.leavingOffice} />
        </ListItem>
        <ListItem>
          <ListItemText  primary="Destination office" secondary={this.props.trip.destinationOffice} />
        </ListItem>
        </List>
        <List className={classes.root} >
        <ListItem>
          <ListItemText  primary="Leaving time" secondary={this.props.trip.leavingDate} />
        </ListItem>
        <ListItem>
          <ListItemText  primary="Return time" secondary={this.props.trip.returningDate} />
        </ListItem>
        </List>
        <Divider/>
        <List style={flexContainer}>
        <ListItem>
          <ListItemText  primary="Airport" secondary={this.props.trip.flight != null ? this.props.trip.flight.airport : "Not available"} />
        </ListItem>
        <ListItem>
          <ListItemText  primary="Flight time" secondary={this.props.trip.flight != null ? this.props.trip.flight.date : "Not available" } />
        </ListItem>
        <ListItem>
          <ListItemText  primary="Booking reference" secondary={this.props.trip.flight != null ? this.props.trip.flight.booking : "Not available" } />
        </ListItem>
        </List>
        <Divider/>
        <List style={flexContainer}>
        <ListItem>
          <ListItemText  primary="Car rent address" secondary={this.props.trip.carRent != null ? this.props.trip.carRentAddress : "Not available"} />
        </ListItem>
        </List>
        <Divider/>
        <List style={flexContainer}>
        <ListItem>
          <ListItemText  primary="Accommodation address" secondary={this.props.trip.aptRoom !=null ? this.props.trip.accommodation : "Not available"} />
        </ListItem>
        <ListItem>
          <ListItemText  primary="Room" secondary={this.props.trip.aptRoom != null ? this.props.trip.aptRoom.roomNo : "Not available" } />
        </ListItem>
        </List>
        <Divider/>
        <List className={classes.root}>
        <ListItem>
          <ListItemText  primary="Approved" secondary={this.props.trip.approved == 1 ? "Yes" : "No" } />
        </ListItem>
        
      </List>
            <DialogActions>
            <Button onClick={this.onClose.bind(this)} color="primary">
              OK
            </Button>
          </DialogActions>
            </DialogContent>
      </Dialog>
                         
        );
    }
}
export default withStyles(styles)(InfoPopup);