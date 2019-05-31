
import * as utils from '../utils/api/user'

export const getAllTravels = () => dispatch => {
    utils.getUserTrips()
        .then(function (response) {
            if (response.responseCode != 200) {
                alert(";(")
            }
            dispatch({
                type: 'GET_TRAVELS_BY_ID',
                employeeTrips: response.responseValue,
            });
        })
}

export const approveTravel = (travelId, checklist) => dispatch =>{
    utils.approveTrip(travelId, checklist.apartments)
        .then(function (response) {
            if (response.responseCode != 200) {
                alert(";(")
            }
            dispatch({
                type: 'APPROVE_TRAVEL',
                Id: travelId,
            });
        })
    utils.updateTripChecklist(checklist)	
        .then(function (response) {	
            if (response.responseCode != 200) {	
                alert(";(")	
            }	
        })
};

export const declineTravel = (travelId) => dispatch =>{
    utils.declineTrip(travelId)
        .then(function (response) {
            if (response.responseCode != 200) {
                alert(";(")
            }
            dispatch({
                type: 'DECLINE_TRAVEL',
                Id: travelId,
            });
        })
};