import React from 'react';
import FancyBanner from '../../Components/FancyBanner/FancyBanner';
import AboutClub from '../../Components/AboutClub/AboutClub';
import Promotions from '../../Components/Promotions/Promotions';

const Home = () => {
    return (
        <>
          <FancyBanner></FancyBanner>
          <AboutClub></AboutClub>
          <Promotions></Promotions>
        </>
    );
};

export default Home;