import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faBars, faXmark, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { 
        NavBarContainer, 
        NavBarExtended,
        NavBarExtendedLink,
        NavBarLeftMenu,
        NavBarLogo,
        NavBarMenu,
        NavBarRightMenu,
        NavBarSearch,
        OpenLinksButton } from '../Stylesheets/navbar.styled.js'

const NavBar = () => {

    const [ status, setStatus ] = useState(false)

    const location = useLocation()
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

            <NavBarRightMenu >
                <NavBarSearch/>
                
                <Link to = 'cart'>
                    <FontAwesomeIcon icon={faShoppingBag} size={'lg'} />
                </Link> 

                {location.pathname === "/login" ? (
                    <Link to="/register">
                        Register
                    </Link>
                ) : (
                    <Link to="/login">
                        Login
                    </Link>
                    )
                }

                {/*  {
                    isAuthenticated ? UserLink() :  location.pathname === "/login" ? (
                        <Link to="/register">
                            Register
                        </Link>
                    ) : (
                        <Link to="/login">
                            Login
                        </Link>
                    )
                } */}

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
                            {/* * {
                                isAuthenticated ? UserLink() :  location.pathname === "/login" ? (
                                    <Link to="/register">
                                        Register
                                    </Link>
                                ) : (
                                    <Link to="/login">
                                        Login
                                    </Link>
                                )
                            } */}

                            {location.pathname === "/login" ? (
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