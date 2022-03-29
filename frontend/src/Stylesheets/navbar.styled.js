import styled from 'styled-components';

export const NavBarContainer = styled.div`
    height: ${(props) => (props.status ? "8.5vh" : '3.7rem')};
    color: #2F5061;
    font-family: 'Raleway', sans-serif;
    justify-content: space-around;
    display: flex;
    position: relative;
    padding: 0.5rem 2rem;
    background-color: #F4EAE6;
    z-index: 100;

        @media(max-width: 768px){
            justify-content: space-between;
        }
        @media(max-width: 540px){
            height: ${(props) => (props.status ? "7.8vh" : '3.4rem')};
        }
`

export const NavBarMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;

        a {
            text-decoration: none;
            color: #2F5061;
            padding: 0 1rem;
            flex-wrap: nowrap;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;

            @media(max-width: 1180px){
                margin-top: 1rem;
            }


            &:hover{
                color: #E57F84;
            }
        }

        @media(max-width: 768px){
            display: none;
        }
`

export const NavBarLeftMenu = styled.div`
    display: flex;
    align-items: center;

        a{
            text-decoration: none;
        } 
`
export const NavBarLogo = styled.img`
    height: 3rem;
    width: 8rem; 
`

export const NavBarRightMenu = styled.div`
    display: flex;
    align-items: center;
    
        a{
            text-decoration: none;
            color: #2F5061;
            font-size: 1rem;
            font-weight: 600;
            padding: 0 1rem;
            flex-wrap: nowrap;
            cursor: pointer;

                @media(max-width: 960px){
                    font-size: 0.9rem;
                }

                @media(max-width: 760px){
                    display:none;
                }

            &:hover {
                color: #E57F84;
            }

        }
`

export const NavBarDropNav = styled.div`
    padding: 1px;
    background: transparent;
    position: relative;
    z-index: 40;

        a{
            text-transform: capitalize;
            overflow: hidden;
            background: transparent;
        }

        img{
            width: 2rem;
            margin-bottom: -0.5rem;
            margin-right: 0.3rem;
        }

       div{
            position: absolute;
            background: #F4EAE6;
            margin-left: 0.5rem;
            margin-top: 0.2rem;
            width: 5rem;
            height: 5rem;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            z-index: 99; 
        }
`

export const NavBarDropdown = styled.ul`
    display: block;

     &:first-child {
        padding-top: 0.8em;
    }

        li{
            padding-top: 0.5rem;
            list-style-type: none;
            margin-bottom: 2px;
            margin-left: 0.1rem;
        } 
`

export const NavBarSearch = styled.input.attrs(props => ({
    type: "text",
    color: props.color || '#2F5061',
  }))`
    border: 1px solid  ${props => props.color};
    margin: 1rem 0.4em 0.4em;
    padding: 0.4em;
    border-radius: 10px;
    outline: none;

        &:focus {
            border: 1px solid #E57F84;
        }

            @media(max-width: 1180px){
                height: 0.9rem;
                width: 10rem;
            }
            @media(max-width: 960px){
                width: 9rem;
            }
            @media(max-width: 800px){
                width: 8rem;
            } 
            @media(max-width: 760px){
                display:none;
            } 
`

export const OpenLinksButton = styled.button`
    color: #2F5061;
    margin-top: 0.5rem;
    height: 3rem;
    width: 6rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    display: block;

        @media(min-width: 768px){
            display: none;
        } 
`

export const NavBarExtended = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(229, 127, 132, 0.4);
    color: #2F5061;
    float: right;
    right: 0;
    margin-top: 4.25rem;
    padding: 2rem;
    width: 80vw;
    height: 75vh;
    z-index: 50;

        @media(min-width: 768px){
            display: none;
        } 
`

export const NavBarExtendedLink = styled.div`
    margin-bottom: 2rem;
    flex-wrap: nowrap;
    background: transparent;
    

    a {
        text-decoration: none;
        color: #2F5061;
        font-size: 1.2rem;
        font-weight: 600;
        background: transparent;
    }
`