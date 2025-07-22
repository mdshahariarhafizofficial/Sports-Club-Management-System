import React from 'react';
import FancyBanner from '../../Components/FancyBanner/FancyBanner';
import AboutClub from '../../Components/AboutClub/AboutClub';
import Promotions from '../../Components/Promotions/Promotions';
import Location from '../../Components/Location/Location';

const Home = () => {
    return (
        <>
          <FancyBanner></FancyBanner>
          <AboutClub></AboutClub>
          <Promotions></Promotions>
          <Location></Location>
        </>
    );
};

export default Home;