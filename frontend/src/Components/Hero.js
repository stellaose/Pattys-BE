import React from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade'
import  { 
          HeroBody,
          HeroContainer } from '../Stylesheets/hero.styled';

const Hero = () => {
  return (
    <>
      <HeroContainer>
        <HeroBody>
          <Fade left>
              <div>
                <h2>It's not just fashion.</h2>
                <p>It's a lifestyle...</p>
                <Link to = 'product'>
                    <p>Start Shopping</p>
                </Link>
              </div>
          </Fade>
        </HeroBody>
      </HeroContainer>
    </>
  )
}

export default Hero;