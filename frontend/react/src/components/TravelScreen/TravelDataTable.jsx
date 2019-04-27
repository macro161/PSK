import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import PlaneIcon from '@material-ui/icons/Flight';
import CarIcon from '@material-ui/icons/DirectionsCar';
import HotelIcon from '@material-ui/icons/Hotel'
import Badge from '@material-ui/core/Badge';
import GroupIcon from '@material-ui/icons/GroupAdd'
import FlightForm from './FlightForm';
import CarRentForm from './CarRentForm';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'fullName', numeric: true, disablePadding: true, label: 'Traveler' },
  { id: 'leavingOffice', numeric: false, disablePadding: true, label: 'Departure office' },
  { id: 'destinationOffice', numeric: false, disablePadding: true, label: 'Destination office' },
  { id: 'leavingDate', numeric: false, disablePadding: true, label: 'Departure time' },
  { id: 'returningDate', numeric: false, disablePadding: true, label: 'Return time' },
  { id: 'info', numeric: false, disablePadding: true, label: 'Trip info' },
];
class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'center' : 'center'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.primary.main,
        backgroundColor: lighten(theme.palette.primary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.primary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} {numSelected % 100 == 1 ? "trip" : "trips"} selected
          </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              Employees travels
          </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Group">
            <IconButton aria-label="Group">
              <GroupIcon />
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,

  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

const EnhancedTableRow = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "rgba(102,255,153,0.2) !important"
    },
    "&$hover:hover": {
      backgroundColor: "rgba(102,255,153,0.15) !important"
    }
  },
  selected: {},
  hover: {},
})(TableRow);

class TravelDataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'calories',
      page: 0,
      rowsPerPage: 5,
      selectedTrips: [],
      addHotel: false,
      addFlight: false,
      addCar: false,
      addId: null,
    };
    this.onCloseAdd.bind(this);
    this.addFlight.bind(this);
    this.addCar.bind(this);
    this.onSubmitCar.bind(this);
    this.onSubmitFlight.bind(this);
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };


  handleClick = (event, id) => {
    const { selectedTrips } = this.state;
    const selectedIndex = selectedTrips.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedTrips, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedTrips.slice(1));
    } else if (selectedIndex === selectedTrips.length - 1) {
      newSelected = newSelected.concat(selectedTrips.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedTrips.slice(0, selectedIndex),
        selectedTrips.slice(selectedIndex + 1),
      );
    }
    this.setState({ selectedTrips: newSelected });
  };
  onCloseAdd = () => {
    this.setState({
      addFlight: false,
      addCar: false,
      addHotel: false,
    })
  }

  addFlight = (id) => {
    this.setState({
      addId: id,
      addFlight: true,
    });
  }
  onSubmitFlight = (id, flight) => {
    this.props.addFlight(id, flight);
    this.onCloseAdd();
  }
  addCar = (id) => {
    this.setState({
      addId: id,
      addCar: true,
    });
  }
  onSubmitCar = (id, car) => {
    this.props.addCar(id, car);
    this.onCloseAdd();
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selectedTrips.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { order, orderBy, selectedTrips, rowsPerPage, page } = this.state;
    let data = this.props.employeeTrips;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div>
        {this.state.addFlight ? <FlightForm onSubmit={this.onSubmitFlight} onClose={this.onCloseAdd.bind(this)} id={this.state.addId}/> : null }
        {this.state.addCar ? <CarRentForm onSubmit={this.onSubmitCar} onClose={this.onCloseAdd.bind(this)} id={this.state.addId}/> : null }
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selectedTrips.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selectedTrips.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id.tripId);
                  return (
                    <EnhancedTableRow
                      hover
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id.employeeId + ' ' + n.id.tripId}
                      selected={isSelected}
                    >
                      <TableCell align="center" onClick={event => this.handleClick(event, n.id.tripId)} >
                        {n.fullName}
                      </TableCell>
                      <TableCell align="center" onClick={event => this.handleClick(event, n.id.tripId)}>{n.leavingOffice}</TableCell>
                      <TableCell align="center" onClick={event => this.handleClick(event, n.id.tripId)}>{n.destinationOffice}</TableCell>
                      <TableCell align="center" onClick={event => this.handleClick(event, n.id.tripId)}>{n.leavingDate.substring(0, 10)}</TableCell>
                      <TableCell align="center" onClick={event => this.handleClick(event, n.id.tripId)}>{n.returningDate.substring(0, 10)}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={event => this.addFlight(n.id)} aria-label="Plane info" className={classes.margin} disabled = {n.tripChecklist.plainTickets == 0 ? true : false}>
                          {n.tripChecklist.plainTickets == 0 ? <PlaneIcon fontSize="small" disabled /> : n.tripChecklist.plainTickets == 1 ?
                            <Badge color="secondary" variant="dot">
                              <PlaneIcon fontSize="small"/>
                            </Badge> :
                            <PlaneIcon fontSize="small" color="primary"/>}
                        </IconButton>
                        <IconButton onClick={event => this.addCar(n.id)} aria-label="Car rent info" className={classes.margin} disabled = {n.tripChecklist.car == 0 ? true : false}>
                          {n.tripChecklist.car == 0 ? <CarIcon fontSize="small" disabled /> :
                            n.tripChecklist.car == 1 ?
                              <Badge color="secondary" variant="dot">
                                <CarIcon fontSize="small" />
                              </Badge> :
                            <CarIcon fontSize="small" color="primary" />}
                        </IconButton>
      
                        <IconButton aria-label="accomodation info" className={classes.margin} disabled = {n.tripChecklist.apartments == 0 ? true : false}>
                          {n.tripChecklist.apartments == 0 ? <HotelIcon fontSize="small" disabled /> : n.tripChecklist.apartments == 1 ?
                            <Badge color="secondary" variant="dot">
                              <HotelIcon fontSize="small" />
                            </Badge> :
                            <HotelIcon fontSize="small" color="primary" />}
                          
                        </IconButton>
                      </TableCell>
                    </EnhancedTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
      </div>
    );
  }
}


TravelDataTable.propTypes = {
  travels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    fullName: PropTypes.string,
    leavingDate: PropTypes.string,
    accomodation: PropTypes.string,
    city: PropTypes.string,
    approved: PropTypes.bool
  })),
  classes: PropTypes.object.isRequired,
  employeeTrips: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    fullName: PropTypes.string,
    leavingDate: PropTypes.string,
    returningDate: PropTypes.string,
    leavingOffice: PropTypes.string,
    destinationOffice: PropTypes.string,
    approved: PropTypes.bool,
    tripChecklist: PropTypes.PropTypes.shape({
      plainTickets: PropTypes.number,
      car: PropTypes.number,
      apartments: PropTypes.number,
    }),
  })),
  show: PropTypes.bool,
  getAllTravels: PropTypes.func,
  getEmployeeTrips: PropTypes.func,
  approveTravel: PropTypes.func,
  cancelTravel: PropTypes.func,
  seeTravelDetails: PropTypes.func,
  editTravel: PropTypes.func,
  removeTravel: PropTypes.func,
  addFlight: PropTypes.func,
  addCar: PropTypes.func,
};
export default withStyles(styles)(TravelDataTable)