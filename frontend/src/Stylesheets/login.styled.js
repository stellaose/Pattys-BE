import styled from 'styled-components';

export const LoginContainer = styled.div`
    width: 100vw;
    margin: 0 auto ;
    min-height: 100vh;
    padding-top: 2rem;
    background-color: #F4EAE6;
`

export const LoginSign = styled.form`
    width: 40vw;
    margin: 2rem auto 0;
    align-items: center;
    padding: 2rem;
    border-radius: 20px;
    border: 1px solid #E57F84;
    /* text-align: center; */
        &:hover{
            border: 1px solid #4297A0;
        }

            @media(max-width: 760px){
                width: 50vw;
            }
`

export const LoginBegin = styled.h2`
    color: #E57F84;
    font-weight: 700;

        &:hover{
            color: #4297A0;
        }
`

export const LoginBox = styled.div`
    margin: 1rem auto;

`

export const LoginLabel = styled.label`
    color: #E57F84;
    font-weight: 600;

        p{
            font-size: 1rem;
            font-weight: 600;
        }

        &:hover{
            color: #4297A0;
        }
`

export const LoginInput = styled.input`
    width: 90%;
    height: 1.5rem;
    margin-top: 0.5rem;
    padding: 0.3rem 1rem;
    color: ${props => props.inputColor || "#2F5061"};
    border: 1px solid #E57F84;
    outline: none;
    border-radius: 10px; 
    font-size: 0.8rem;
    font-weight: 700;
    
        &:focus{
            border: 1px solid #4297A0;
        }
`

export const LoginPass = styled.div`
    margin: 1rem auto 0.5rem;
    

        a{
            text-decoration: none;
            color: #2F5061;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 600;

            @media(max-width: 760px){
                font-size: 0.7rem;
            }
        }

`

export const LoginButton = styled.button`
   padding: 0.5rem 2rem;
   margin: 1rem auto 0.5rem;
   justify-self: center;
   font-size: 1.2rem;
   font-weight: 600;
   background: none;
   cursor: pointer;
   border: 1px solid #E57F84;
   border-radius: 10px;
   color: #2F5061;

        &:hover{
            background: #E57F84;
        }
`