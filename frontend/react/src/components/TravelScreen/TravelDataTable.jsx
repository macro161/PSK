import React from 'react';
import TableRow from './TravelDataTableRow';
import PropTypes from 'prop-types';

export default class TravelDataTable extends React.Component {
  constructor(props) {
    super(props);
  }

  

  render(){
    const travels = this.props.travels;
    return(
        <table>
            <tbody>
            <tr>
                <th className="name">Name</th>
                <th className="surname">Surname</th>
                <th className="departureTime">Departure time</th>
                <th className="plainTickets">Plain tickets</th>
                <th className="accommodation">Accommodation</th>
                <th className="status">Status</th>
                <th className="info">Info</th>
                <th className="actions">Actions</th>
            </tr>
            {
                travels.map(travel => {
                    return (<TableRow
                        key={travel.id}
                        id={travel.id}
                        name={travel.name}
                        surname={travel.surname}
                        departureTime={travel.departureTime}
                        accomodation={travel.accomodation}
                        city={travel.city}
                        approved={travel.approved}
                        approveTravel={this.props.approveTravel}
                        cancelTravel={this.props.cancelTravel}
                        show={this.props.show}
                        showInfo={this.props.showInfo}
                        editTravel={this.props.editTravel}
                        removeTravel={this.props.removeTravel}
                        />);
                })
            }
            </tbody>
        </table>
    );
  }
}
  

TravelDataTable.propTypes = {
    travels: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        surname: PropTypes.string,
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
        editTravel: PropTypes.func,
        removeTravel: PropTypes.func,
};