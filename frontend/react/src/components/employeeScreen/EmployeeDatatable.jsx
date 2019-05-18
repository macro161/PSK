import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
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
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import ApprovalPopup from "./ApprovalPopup.jsx"
import InfoPopup from "./InfoPopup.jsx"

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

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
  { id: 'departureTime', numeric: false, disablePadding: false, label: 'Departure time' },
  { id: 'returnTime', numeric: true, disablePadding: false, label: 'Return time' },
  { id: 'accommodation', numeric: true, disablePadding: false, label: 'Accommodation' },
  { id: 'Status', numeric: true, disablePadding: false, label: '' },
  { id: 'popup', numeric: false, disablePadding: false, label: '' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, rowCount } = this.props;

    return (
      <TableHead > 
        <TableRow>
          {rows.map(
            row => (
              <TableCell 
                key={row.id}
                align='center'
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
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root)}>
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
            Travels
          </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

// ----------------------------------------------------------------------Table

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

class EmployeeDataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'calories',
      data: [],
      page: 0,
      rowsPerPage: 5,
      showInfo :false,
      showApprovalPopup :false,
      activeTrip: null,
    };
    this.onShowInfo = this.onShowInfo.bind(this)
    this.onApprove = this.onApprove.bind(this)
    this.onDecline = this.onDecline.bind(this)
  }
  

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  onApprove = (e, trip) =>{
    this.setState({showApprovalPopup: true, activeTrip: trip})
  }

  onDecline = (e, trip) =>{

  }

  onShowInfo =(e, trip)=>{
    this.setState({showInfo: true, activeTrip: trip})
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  onCloseEdit=(e)=>{
    this.setState({showApprovalPopup:false, activeTrip :null})
  }

  onCloseInfo=(e)=>{
    this.setState({showInfo:false, activeTrip:null})
  }

  onApprovalSubmit = (trip, wantsAccommodation, wantsCar, wantsTicets) =>{
    var apt = wantsAccommodation ? 1 : 0;
    var car = wantsCar ? 1 : 0;
    var tickets = wantsTicets ? 1 : 0;
    console.log(trip)
    var tripChecklist = {
      apartments: apt,
      car: car,
      id: trip.tripChecklist.id,
      plainTickets: tickets
    }
    this.props.approveTravel(trip.id.tripId, tripChecklist)
  }

  render() {
    const { classes } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    let data = this.props.travels;
    console.log(data)
    var length
    if(data==undefined)
       length = 0;
       else length = data.length
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, length - page * rowsPerPage);

    return (
      <div>
      {this.state.showInfo ? <InfoPopup trip={this.state.activeTrip} onClose={this.onCloseInfo.bind(this)} /> : null}
      {this.state.showApprovalPopup ? <ApprovalPopup trip={this.state.activeTrip} onClose={this.onCloseEdit.bind(this)} onApprovalSubmit = {this.onApprovalSubmit.bind(this)} /> : null}
      <Paper className={classes.root}>
        <EnhancedTableToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
          <colgroup>
            <col width="20%" />
            <col width="20%" />
            <col width="40%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={n.id.tripId}
                    >
                      <TableCell align="center" omponent="th" scope="row" >{n.leavingDate.substring(0, 10)}</TableCell>
                      <TableCell align="center">{n.returningDate.substring(0, 10)}</TableCell>
                      <TableCell align="center">{n.accommodation}</TableCell>
                      <TableCell align="center" >{ n.approved? <Button disabled>Approved</Button> : <Button onClick={event => this.onApprove(event, n)} color="primary">Approve</Button> }</TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="Info" onClick={event => this.onShowInfo(event, n)}><InfoIcon/></IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={length}
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
  
EmployeeDataTable.propTypes = {
  travels: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      departureTime: PropTypes.string,
      accomodation: PropTypes.string,
      city: PropTypes.string,
      approved: PropTypes.bool
      })),
      show: PropTypes.bool,
      getAllTravels: PropTypes.func,
      onShowInfo: PropTypes.func,
      onCloseEdit: PropTypes.func,
      onCloseInfo: PropTypes.func,
      approveTravel: PropTypes.func,
      cancelTravel: PropTypes.func,
      seeTravelDetails: PropTypes.func,
      showInfo: PropTypes.func,
      onApprove: PropTypes.func,
      onDecline: PropTypes.func,
      classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployeeDataTable);