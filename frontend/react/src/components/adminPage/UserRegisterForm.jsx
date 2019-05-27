import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  formControl: {
    minWidth: 200,
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

class UserRegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: this.props.fullName,
      city: this.props.city,
      email: this.props.Contactemail,
      destinationOffice: null,
      showableOffice: null,
      password1: "",
      password2: "",
      onClose: this.props.onClose,
      error: false,
      role: "USER"
    };
    
  }

  inputChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  handleChangeRole(e) {
    this.setState({
      role: e.target.value,
    });
  }
  onSubmit() {
    this.setState({ error: false });
    this.state.password1 == this.state.password2 ?
      this.props.onSubmit(this.state.fullName,  this.state.destinationOffice,  this.state.email, this.state.password1, this.state.role)
      : this.setState({ error: true });
  }

  handleChangeDestination(e) {
    this.setState({
      destinationOffice: e.value.id,
      showableOffice: e.value
    });
  };

  

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

    const components = {
      Control,
      Menu,
      NoOptionsMessage,
      Option,
      Placeholder,
      SingleValue,
      ValueContainer,
    };
    return (
      <Dialog
        open={true}
        onClose={this.props.onClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register new employee</DialogTitle>
        <DialogContent>
        <form style={{ display: 'flex' }}>
            <TextField
              id="fullName"
              label="Full name"
              className="form-text-field"
              type="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
           <FormControl className={classes.formControl}>
        <InputLabel htmlFor="role-native-simple">Role</InputLabel>
        <NativeSelect onChange={this.handleChangeRole.bind(this)} defaultValue={"USER"} input={<Input  name="name" id="role-native-simple" />}>
          <option value={"USER"}>User</option>
          <option value={"ORGANISER"}>Organiser</option>
          <option value={"ADMIN"}>Admin</option>
        </NativeSelect>
          </FormControl>
          </form>
            <Select
              classes={classes}
              styles={selectStyles}
              options={this.props.offices.map(off => ({
                value: off,
                label: off.city,
              }))}
              components={components}
              value={this.state.showableOffice == null ? null : {value : this.state.showableOffice, label : this.state.showableOffice.city}}
              onChange={this.handleChangeDestination.bind(this)}
              textFieldProps={{
                label: 'Office',
                InputLabelProps: {
                  shrink: true,
                },
              }}
              isClearable
            />
            <TextField
              id="email"
              label="Email address"
              className="form-text-field-email"
              type="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            <TextField
              error={this.state.error}
              id="password1"
              name="password1"
              label="Password"
              className="form-text-field"
              type="password"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
              error={this.state.error}
              id="password2"
              name="password2"
              label="Repeat password"
              className="form-text-field"
              type="password"
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

UserRegistrationForm.propTypes = {
  classes: PropTypes.object.isRequired,
  fullName: PropTypes.any,
  city: PropTypes.any,
  email: PropTypes.any,
  onClose: PropTypes.any,
  onSubmit: PropTypes.any,
  offices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    city: PropTypes.string,
    address: PropTypes.string
  }))
};

UserRegistrationForm.defaulProps = {
  fullName: '',
  city: '',
  email: '',
};
export default withStyles(styles, { withTheme: true})(UserRegistrationForm);