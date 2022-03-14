import styled, {keyframes} from 'styled-components';

const animateDown = keyframes`
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(1rem);
    }

    60% {
        transform: translateY(1rem);
    }
`

export const HeroContainer = styled.div`
    width: 84.7vw;
    height: 100vh;
    position: relative;

        @media(max-width: 620px){
            width: 87vw;
        }
`

export const HeroBody = styled.div`
    width: 100%;
    height: 70%;
    position: relative;
    display: block;
    padding: 6rem;
    background: url('/asset/Hero.jpg') no-repeat top;
    background-size: 100% 100%;
    z-index: 1;

        div{
            background: rgb(66, 151, 160, 0.1);
            border-radius: 20px;
            width: 40%;
            padding: 2rem;
            color: #B52B40;

                @media(max-width: 960px){
                    width: 45%;
                }

                @media(max-width: 960px){
                    width: 50%;
                }

                &:hover {
                    color: #4297A0;
                }
        }

        h2,  p {
            background: transparent;
            /* color: #B52B40; */
        }

        h2{
            font-size: 2rem;
            font-weight: 700;

                @media (max-width: 960px){
                    font-size: 1.8rem;
                }

                @media (max-width: 700px){
                    font-size: 1.6rem;
                }

                @media (max-width: 540px){
                    font-size: 1.3rem;
                }

                @media (max-width: 440px){
                    font-size: 1.1rem;
                }

                @media (max-width: 373px){
                    font-size: 0.8rem;
                }
        }

        p{
            margin-top: 0.5rem;
            font-size: 1.3rem;
            font-weight: 500;

                @media (max-width: 960px){
                    font-size: 1.1rem;
                }

                @media (max-width: 700px){
                    font-size: 1rem;
                }

                @media (max-width: 500px){
                    font-size: 0.9rem;
                }
        }

        a{
           text-decoration: none;
            
            p {
                    width: fit-content;
                    margin-top: 2rem;
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: #B52B40;
                    cursor: pointer;
                    border-bottom: 2px solid #4297A0;
                    background: transparent;
                    animation: ${animateDown} 10s linear 0.5s infinite alternate;


                    &:hover {
                        color: #4297A0;
                        border-bottom: 3px solid #E57F84;
                    }

                    @media (max-width: 960px){
                        font-size: 1.1rem;
                    }

                    @media (max-width: 700px){
                        font-size: 1rem;
                    }

                    @media (max-width: 500px){
                        font-size: 0.9rem;
                    }
                }
        }

    @media(max-width: 960px){
        padding: 4rem;
        background-size: 100% 80%;
    }

    @media(max-width: 620px){
        padding: 4rem 2rem;
        background-size: 100% 60%;
    }
`