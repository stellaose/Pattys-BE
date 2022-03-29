import { LoginType } from '../Type';

const LogoutAction = ()  => (dispatch) => {
    try{
       dispatch({ type: LoginType.LOGOUT});
         // history.push("/");
         localStorage.removeItem("userToken", "tokenId")
    }
    catch(err){
       console.log(err)
    } 
}

export default LogoutAction;