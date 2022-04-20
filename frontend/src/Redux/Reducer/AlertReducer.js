import { AlertType } from '../Type/AlertType';

const AlertReducer = (state = {}, action ) => {
    switch (action.type){
        case AlertType.ALERT_SUCCESS: 
            return {
                type: 'alert_success',
                message: action.message
            }

        default:
            return state
    }
}

export default AlertReducer;