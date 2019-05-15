
import * as utils from '../utils/api/user'

export const getAllTravels = () => dispatch => {
    console.log("actions")
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

export const approveTravel = (travelId) =>{
    return {
        type: 'APPROVE_TRAVEL',
        Id: travelId,
    }
};

export const cancelTravel = (travelId) => {
    return {
        type: 'CANCEL_TRAVEL',
        Id: travelId,
    }
}
