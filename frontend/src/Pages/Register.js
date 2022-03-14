import React from 'react'
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

import {
        RegisterBox,
        RegisterButton,
        RegisterInput,
        RegisterLabel,
        RegisterPass,
        RegisterReg,
        RegisterSign,
        RegisterStart} from '../Stylesheets/register.styled'

const Register = () => {
  return (
        <>
            <RegisterSign>
                <Fade right>
                    <RegisterReg>
                        <RegisterStart>REGISTER HERE</RegisterStart>

                        <RegisterBox>
                            <RegisterLabel>
                                <p>Firstname</p>
                                <RegisterInput 
                                    type = 'firstname'
                                    id = 'firstname'
                                    placeholder = 'Enter your firstname...'
                                />
                            </RegisterLabel>
                        </RegisterBox>

                        <RegisterBox>
                            <RegisterLabel>
                                <p>Lastname</p>
                                <RegisterInput 
                                    type = 'lastname'
                                    id = 'lastname'
                                    placeholder = 'Enter your lastname...'
                                />
                            </RegisterLabel>
                        </RegisterBox>

                        <RegisterBox>
                            <RegisterLabel>
                                <p>E-mail</p>
                                <RegisterInput 
                                    type = 'email'
                                    id = 'email'
                                    placeholder = 'pattys@pattys.com...'
                                />
                            </RegisterLabel>
                        </RegisterBox>

                        <RegisterBox>
                            <RegisterLabel>
                                <p>Password</p>
                                <RegisterInput 
                                    type = 'password'
                                    id = 'password'
                                    placeholder = 'password...'
                                />
                            </RegisterLabel>
                        </RegisterBox>

                        <RegisterBox>
                                <RegisterLabel>
                                    <p>Confirm password</p>
                                    <RegisterInput 
                                        type = 'password'
                                        id = 'confirmPassword'
                                        placeholder = 'password...'
                                    />
                                </RegisterLabel>
                        </RegisterBox>

                        <RegisterPass>
                            <Link to = '/login'>
                                Already have an account? Login here...
                            </Link>
                        </RegisterPass>
                        <RegisterButton>Register</RegisterButton>
                    </RegisterReg>
                </Fade>
            </RegisterSign>
        </>
    );
};

export default Register;
