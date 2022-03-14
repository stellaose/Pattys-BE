import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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

    const { email, password, err, success } = user

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('user/login', {email, password});

           console.log(res);
           setUser({
                    ...user,
                    err:'',
                    success: res.data.message 
                })
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

                <LoginButton type='submit' >
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