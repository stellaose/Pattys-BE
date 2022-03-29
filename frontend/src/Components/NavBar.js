import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutAction from '../Redux/Actions/LogoutAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faBars, faXmark, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { 
        NavBarContainer, 
        NavBarDropdown,
        NavBarDropNav,
        NavBarExtended,
        NavBarExtendedLink,
        NavBarLeftMenu,
        NavBarLogo,
        NavBarMenu,
        NavBarRightMenu,
        NavBarSearch,
        OpenLinksButton } from '../Stylesheets/navbar.styled.js'

const NavBar = () => {

    const auth = useSelector((state) => state.login || {});

    const {user, isLoggedIn } = auth;

    const [ status, setStatus ] = useState(false);
    const [ dropdown, setDropdown ] = useState(false)

    const location = useLocation();
    const dispatch = useDispatch();


    const refreshPage = (e) => {
        e.preventDefault();
        dispatch(LogoutAction());
        window.location.reload(false);
      }

      const handleDrop = () => {
          setDropdown(!dropdown);
      }

    const UserLink = () => {
        return <NavBarDropNav onClick={handleDrop}>
            <Link to="#" >
                <img src={user.avatar} alt=""/> {user.firstname} <FontAwesomeIcon icon={faChevronDown} size={'sm'} />
            </Link>

            {dropdown && (
                <div>
                    <NavBarDropdown>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/" onClick={refreshPage}>Logout</Link></li>
                    </NavBarDropdown>   
                </div>
            )}
            
        </NavBarDropNav>
    }

    const transForm = {
        transform: isLoggedIn ? "translateY(0px)" : 0
    }

  return (
    <>
        <NavBarContainer>
            <NavBarLeftMenu>
                 <Link to = '/'>
                    <NavBarLogo src = '/asset/pattys-logo.png'/>
                </Link>
            </NavBarLeftMenu>

            <NavBarMenu>
                <Link to = 'contact'>
                    Contact us
                </Link>
                <Link to = 'about'>
                   About us
                </Link>
            </NavBarMenu>

            <NavBarRightMenu style = {transForm}>
                <NavBarSearch/>
                
                <Link to = 'cart'>
                    <FontAwesomeIcon icon={faShoppingBag} size={'lg'} />
                </Link> 

                 {
                    isLoggedIn ? UserLink() :  location.pathname === "/login" ? (
                        <Link to="/register">
                            Register
                        </Link>
                    ) : (
                        <Link to="/login">
                            Login
                        </Link>
                    )
                }

            </NavBarRightMenu>

            <OpenLinksButton onClick={() => setStatus(!status)}>
                {status? 
                        <FontAwesomeIcon icon={faXmark} size={'xl'} /> : <FontAwesomeIcon icon={faBars} size={'xl'} />
                }
                
            </OpenLinksButton>
                { status && 
                    (<NavBarExtended>
                        <NavBarExtendedLink>
                            <Link to = 'contact'>
                                Contact us
                            </Link>
                        </NavBarExtendedLink>
                        <NavBarExtendedLink>
                            <Link to = 'about'>
                                About us
                            </Link>
                        </NavBarExtendedLink>
                        <NavBarExtendedLink>
                            <Link to = 'cart'>
                                <FontAwesomeIcon icon={faShoppingBag} size={'lg'} />
                            </Link>
                        </NavBarExtendedLink>
                        <NavBarExtendedLink>
                            * {
                                isLoggedIn ? UserLink() :  location.pathname === "/login" ? (
                                    <Link to="/register">
                                        Register
                                    </Link>
                                ) : (
                                    <Link to="/login">
                                        Login
                                    </Link>
                                )
                            }

                        </NavBarExtendedLink>
                    </NavBarExtended>
                )}
        </NavBarContainer>
    </>
  )
}

export default NavBar