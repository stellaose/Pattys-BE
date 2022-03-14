import styled from 'styled-components';

export const RegisterSign = styled.div`
    width: 100vw;
    margin: 0 auto ;
    min-height: 100vh;
    padding-top: 2rem;
    background-color: #F4EAE6;
    z-index: 10;
`

export const RegisterReg = styled.div`
    width: 40vw;
    margin: 1rem auto 0;
    align-items: center;
    padding: 2rem;
    border-radius: 20px;
    border: 1px solid #4297A0;
    /* text-align: center; */
        &:hover{
            border: 1px solid #E57F84;
        }

            @media(max-width: 760px){
                width: 50vw;
            }
`

export const RegisterStart = styled.h2`
    color: #4297A0;
    font-weight: 800;

        &:hover{
            color: #E57F84;
        }
`

export const RegisterBox = styled.div`
    margin: 1rem auto;

`

export const RegisterLabel = styled.label`
    color: #4297A0;
    font-weight: 600;


        p{
            font-size: 1rem;
            font-weight: 600;
        }

        &:hover{
            color: #E57F84;
;
        }
`

export const RegisterInput = styled.input`
    width: 90%;
    height: 1.5rem;
    margin-top: 0.5rem;
    padding: 0.3rem 1rem;
    color: ${props => props.inputColor || "#2F5061"};
    border: 1px solid #4297A0;
    outline: none;
    border-radius: 10px; 
    font-size: 0.8rem;
    font-weight: 700;
    
        &:focus{
            border: 1px solid #E57F84;
;
        }
`

export const RegisterPass = styled.div`
    margin: 1rem auto 0.5rem;
    /* text-align: center; */

        a{
            text-decoration: none;
            color: #2F5061;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 600;
        }
`

export const RegisterButton = styled.button`
    padding: 0.5rem 2rem;
    margin: 1rem auto 0.5rem;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
    background: none;
   // * cursor: pointer;
    border: 1px solid #4297A0;
    border-radius: 10px;
    color: #B52B40;

        &:hover{
            background: #4297A0;
        }

            @media(max-width: 760px){
                font-size: 1rem;
            }
`