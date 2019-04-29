import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import green from '@material-ui/core/colors/green';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}))(MuiDialogContent);

const DialogTitle = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const styles = theme => ({
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
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
      leavingOffice: null,
      destinationOffice: null,
      selectedEmployee: null,
      fullName: this.props.fullName,
      departureTime: new Date().toISOString().substr(0, 10),
      returningTime: new Date().toISOString().substr(0, 10),
      accommodation: this.props.accommodation,
      offices: this.props.offices,
      employees: this.props.employees,
      city: this.props.city,
      onClose: this.props.onClose,
      checkedPlane: true,
      checkedCar: true,
      checkedAcomondation: true,
    };

  }
  handleChangeCheckBox(e) {
    this.setState({ [e.target.value]: e.target.checked });
  };
  handleChange(e) {
    this.setState({
      selectedEmployee: e.value,
      fullName: e.value.fullName,
    });
  };
  handleChangeLeaving(e) {
    this.setState({
      leavingOffice: e.value,
    });
  };
  handleChangeDestination(e) {
    this.setState({
      destinationOffice: e.value,
    });
  };

  inputChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  onSubmit() {
    this.props.onSubmit(this.state.selectedEmployee, this.state.departureTime, this.state.returningTime, this.state.leavingOffice, this.state.destinationOffice, {plainTickets : this.state.checkedPlane ? 1 : 0, car : this.state.checkedCar ? 1 : 0, apartments : this.state.checkedAcomondation ? 1 : 0 } );
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
        <DialogTitle id="form-dialog-title" onClose={this.props.onClose}>Create new trip</DialogTitle>

        <DialogContent>
          <NoSsr>
            <Select
              classes={classes}
              styles={selectStyles}
              options={this.props.employees.map(emp => ({
                value: emp,
                label: emp.fullName,
              }))}
              components={components}
              value={this.state.selectedEmployee == null ? null : { value: this.state.selectedEmployee, label: this.state.selectedEmployee.fullName }}
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
              defaultValue={this.state.departureTime}
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
              defaultValue={this.state.returningTime}
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
                value: off,
                label: off.city,
              }))}
              components={components}
              value={this.state.leavingOffice == null ? null : {value : this.state.leavingOffice, label : this.state.leavingOffice.city}}
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
                value: off,
                label: off.city,
              }))}
              components={components}
              value={this.state.destinationOffice == null ? null : {value : this.state.destinationOffice, label : this.state.destinationOffice.city}}
              onChange={this.handleChangeDestination.bind(this)}
              textFieldProps={{
                label: 'Destination office',
                InputLabelProps: {
                  shrink: true,
                },
              }}
              isClearable
            />
              <FormGroup row>
              <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedPlane}
              onChange={this.handleChangeCheckBox.bind(this)}
              value="checkedPlane"
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
            />
                  }
          labelPlacement="start"       
          label="Plane"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedCar}
              onChange={this.handleChangeCheckBox.bind(this)}
              value="checkedCar"
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
            />
                  }
          labelPlacement="start"       
          label="Car"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedAcomondation}
              onChange={this.handleChangeCheckBox.bind(this)}
              value="checkedAcomondation"
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
            />
                  }
          labelPlacement="start"       
          label="Acomondation"
        />
              </FormGroup>
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

