import { LoginType } from "../Type"

const savedUser = JSON.parse(localStorage.getItem("userToken") || "{}")

const initialState = {
    isLoggedIn : !!savedUser?._id,
    user: {},
    isLoading: false,
    error: {},
    isAdmin: false,
    ...savedUser
}

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LoginType.LOGIN_REQUEST:
            return {  
                ...state, 
                isLoading: true,
                isLoggedIn: false
          };
            
        case LoginType.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                user: action.payload
            }

            case LoginType.LOGIN_FAIL:
                return { 
                        ...state, 
                        isLoading: false, 
                        isLoggedIn: false,
                        error: action.payload 
                    };
            
            case LoginType.LOGOUT:
                return {
                        isLoggedIn: false,
                        isLoading: false
                    };
        default:
            return state
    }
}

export default LoginReducer
