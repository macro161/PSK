
import * as utils from '../utils/api/user'

export const getAllTravels = () => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    utils.getUserTrips()
        .then(function (response) {
            if (response.responseCode != 200) {
                alert("As tikrai gausiu dusimtini")
            }
            dispatch({
                type: 'SET_LOADING',
                employeeTrips: response.responseValue,
            });
            dispatch({ type: 'SET_LOADING', value: false });
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
