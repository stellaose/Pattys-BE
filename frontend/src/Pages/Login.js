import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import LoginAction from '../Redux/Actions/LoginAction';
import Fade from 'react-reveal/Fade'
import { ErrMessage, SuccessMessage } from '../Utils/Notification'

import {
        LoginBegin,
        LoginBox,
        LoginButton,
        LoginContainer,
        LoginInput,
        LoginLabel,
        LoginPass,
        LoginSign} from '../Stylesheets/login.styled'

const Login = () => {
    const initialState = {
                            email: '',
                            password: '',
                            err: '',
                            success: ''
                        }
    const [ user, setUser ] = useState(initialState)

    const { email, password, err, success } = user;
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user, 
            [name]:value, 
            err: '', 
            success: ''
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(LoginAction(email, password, navigate))
        } catch (err) {
            err.res.data.message &&
            setUser({
                ...user,
                err: err.res.data.message, 
                success: ''
              })
        }
    }
  return (
    <>
        <LoginContainer>
            <Fade left>
            <LoginSign onSubmit={handleSubmit}>
                <LoginBegin>LOGIN HERE</LoginBegin>

                {err && ErrMessage(err)}
                {success && SuccessMessage(success)}
                <LoginBox>

                    <LoginLabel htmlFor='email'>
                        E-mail
                    </LoginLabel>

                    <LoginInput 
                        type="text" 
                        placeholder="Enter email address" 
                        id="email" 
                        value = {email} 
                        name="email" 
                        onChange={handleInput}
                    /> 
                </LoginBox>

                <LoginBox>

                    <LoginLabel htmlFor='email'>
                    Password
                    </LoginLabel>

                    <LoginInput 
                        type="password" 
                        placeholder="Enter email address" 
                        id="password" 
                        value = {password} 
                        name="password" 
                        onChange={handleInput}
                    /> 
                </LoginBox>

                <LoginPass>
                    <Link to = '/register'>
                    Don't have an account? Create one here.
                    </Link>
                </LoginPass> 

                <LoginButton type='submit' onClick={LoginAction}>
                    Login
                </LoginButton>

                <LoginPass>
                    <Link to = '/forget-password'>
                        Forget password?
                    </Link>
                </LoginPass> 
            </LoginSign>
            </Fade>
        </LoginContainer>
    </>
  )
}

export default Login