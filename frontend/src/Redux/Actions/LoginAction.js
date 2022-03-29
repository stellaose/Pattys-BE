import axios from 'axios';
import { LoginType } from '../Type';


const LoginAction = (email, password, navigate) => async (dispatch) => {
    try {
        const { data } = await axios.post('user/login', {
          email,
          password,
        });
        
        dispatch({ 
            type: LoginType.LOGIN_SUCCESS, 
            payload: data
        });
        navigate(-1);
        localStorage.setItem("userToken", JSON.stringify(data));
      } 
      catch (err) {
        dispatch({
          type: LoginType.LOGIN_FAIL,
          payload: err.message,
        });
      }
}

export default LoginAction;