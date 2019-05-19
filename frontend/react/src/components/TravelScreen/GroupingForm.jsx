import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
});

class GroupingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFrom: '',
      dateTo : ''
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onSubmit() {
    this.props.onSubmit(new Date(this.state.dateFrom.replace('-', '/')).toISOString(), new Date(this.state.dateTo.replace('-', '/')).toISOString());
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog
      disableBackdropClick = {true}
      disableEscapeKeyDown
      open={true}
      onClose={this.props.onClose}
    >
      <DialogTitle>Select trip dates</DialogTitle>
      <DialogContent>
        <form className={classes.container}>
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="departureDate">Departure date</InputLabel>
            <Select
              value={this.state.dateFrom}
              onChange={this.handleChange('dateFrom')}
              input={<Input id="departureDate" />}
              >
                {this.props.datesFrom.map(function (date) {
                  const d = new Date(date);
                  return <MenuItem  key = {d} value={d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()}>{d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()}</MenuItem>
                })}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="returnDate">Return date</InputLabel>
            <Select
              value={this.state.dateTo}
              onChange={this.handleChange('dateTo')}
              input={<Input id="returnDate" />}
              >
                {this.props.datesTo.map(function (date) {
                  const d = new Date(date);
                  return <MenuItem key = {d} value={d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()}>{d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()}</MenuItem>
                })}
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.onSubmit.bind(this)} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
    );
  }
}
GroupingForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

export default withStyles(styles)(GroupingForm);