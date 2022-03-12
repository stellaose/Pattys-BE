import { User } from '../Models/UserModel.js';
import ErrorResponse from '../Utils/ErrorHandler.js';

const authAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.user.id})   
        if(user.role !==1){
            return next
                (new ErrorResponse('Admin access denied', 500))
        }    
        next()
    } catch (err) {
        console.log(err);
        return next
            (new ErrorResponse('Server error', 500))
    }
}

export default authAdmin;