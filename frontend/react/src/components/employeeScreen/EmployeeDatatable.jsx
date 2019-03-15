import React from 'react';
import TableRow from './EmployeeDatarow';
import PropTypes from 'prop-types';

export default class EmployeeDataTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    const travels = this.props.travels;
    return(
        <table>
            <tbody>
            <tr>
                <th className="departureTime">Departure time</th>
                <th className="plainTikets">Plain tickets</th>
                <th className="accommodation">Accommodation</th>
                <th className="status">Status</th>
                <th className="Info">Info</th>
            </tr>
            {
                travels.map(travel => {
                    return (<TableRow
                                key={travel.id}
                                id={travel.id}
                                departureTime={travel.departureTime}
                                accomodation={travel.accomodation}
                                city={travel.city}
                                approved={travel.approved}
                                approveTravel={this.props.approveTravel}
                                cancelTravel={this.props.cancelTravel}
                                show={this.props.show}
                                showInfo={this.props.showInfo}
                                />);
                })
            }
            </tbody>
        </table>
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
        approveTravel: PropTypes.func,
        cancelTravel: PropTypes.func,
        seeTravelDetails: PropTypes.func,
        showInfo: PropTypes.func,
};