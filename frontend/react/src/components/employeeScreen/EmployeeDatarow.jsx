import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export default class EmployeesDatarow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td className="id">{this.props.id}</td>
        <td className="departureTime">{this.props.departureTime}</td>
        <td className="accomodation">{this.props.accomodation}</td>
        <td className="actions">
            <Button variant="contained" color="primary" className={classes.button}>Plain tickets</Button> 
            <Button variant="contained" color="primary" className={classes.button}>Approve</Button>
            <Button variant="contained" color="primary" className={classes.button}>Info</Button> 
        </td>
      </tr>
    );
  }
}


EmployeeDatarow.propTypes = {
  id: PropTypes.string.isRequired,
  departureTime: PropTypes.string.isRequired,
  accomodation: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};