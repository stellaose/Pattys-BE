import { LoginType } from  '../Type/LoginType';

const token = ''

const TokenReducer = (state = token, action) => {
    switch(action.type){
        case LoginType.GET_TOKEN:
            return action.payload
        default:
            return state
    }
}

export default TokenReducer