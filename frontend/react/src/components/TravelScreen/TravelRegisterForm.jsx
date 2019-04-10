import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  input: {

    display: 'flex',
    padding: 0,
  },
  textField: {
    marginRight: theme.spacing.unit * 2,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 4,
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}
function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class TravelRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toISOString().substr(0, 10),
      leavingOffice: null,
      destinationOffice: null,
      selectedEmployee: null,
      fullName: this.props.fullName,
      departureTime: this.props.departureTime,
      returningTime: null,
      accommodation: this.props.accommodation,
      offices: this.props.offices,
      employees: this.props.employees,
      city: this.props.city,
      onClose: this.props.onClose,
    };

  }

  handleChange(e) {
    this.setState({
      selectedEmployee: e,
    });
  };
  handleChangeLeaving(e) {
    this.setState({
      leavingOffice: e,
    });
  };
  handleChangeDestination(e) {
    this.setState({
      destinationOffice: e,
    });
  };

  inputChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  onSubmit() {
    this.props.onSubmit(Math.floor(Math.random() * 10000).toString(), this.state.fullName, this.state.departureTime, this.state.accommodation, this.state.city, true);
  }


  render() {
    const { classes, theme } = this.props;
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };
    return (
      <Dialog
        open={true}
        onClose={this.props.onClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new trip</DialogTitle>

        <DialogContent>
          <NoSsr>
            <Select
              classes={classes}
              styles={selectStyles}
              options={this.props.employees.map(emp => ({
                value: emp.id,
                label: emp.fullName,
              }))}
              components={components}
              value={this.state.selectedEmployee}
              onChange={this.handleChange.bind(this)}
              textFieldProps={{
                label: 'Employee',
                InputLabelProps: {
                  shrink: true,
                },
              }}
              isClearable
            />
            <TextField
              id="departureTime"
              label="Departure time"
              className="form-time-travel"
              type="date"
              defaultValue={this.state.date}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.inputChange.bind(this)}
            />
            &nbsp;&nbsp;&nbsp;
              <TextField
              id="returningTime"
              label="Returning time"
              className="form-time-travel"
              type="date"
              margin="normal"
              defaultValue={this.state.date}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.inputChange.bind(this)}
            />
            <br />
            <Select
              classes={classes}
              styles={selectStyles}
              options={this.props.offices.map(off => ({
                value: off.id,
                label: off.city,
              }))}
              components={components}
              value={this.state.leavingOffice}
              onChange={this.handleChangeLeaving.bind(this)}
              textFieldProps={{
                label: 'Leaving office',
                InputLabelProps: {
                  shrink: true,
                },
              }}
              isClearable
            />
            <br />
            <Select
              classes={classes}
              styles={selectStyles}
              options={this.props.offices.map(off => ({
                value: off.id,
                label: off.city,
              }))}
              components={components}
              value={this.state.destinationOffice}
              onChange={this.handleChangeDestination.bind(this)}
              textFieldProps={{
                label: 'Destination office',
                InputLabelProps: {
                  shrink: true,
                },
              }}
              isClearable
            />
            <div className="register-form-buttons">
              <Button variant="contained" size="medium" color="primary" onClick={this.onSubmit.bind(this)}>
                Register
            </Button>
              <Button variant="contained" size="medium" color="secondary" className="cancel-button" onClick={this.props.onClose}>
                Cancel
            </Button>
            </div>
          </NoSsr>
        </DialogContent>
      </Dialog>
    );
  }
}

TravelRegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  fullName: PropTypes.string,
  departureTime: PropTypes.any,
  accommodation: PropTypes.any,
  city: PropTypes.any,
  onClose: PropTypes.any,
  onSubmit: PropTypes.any,
  offices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    city: PropTypes.string,
    address: PropTypes.string
  })),
  employees: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    fullName: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
  }))
};

TravelRegisterForm.defaulProps = {
  fullName: '',
  departureTime: '',
  accommodation: '',
  city: '',
};
export default withStyles(styles, { withTheme: true })(TravelRegisterForm);

