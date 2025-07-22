import React from 'react';
import FancyBanner from '../../Components/FancyBanner/FancyBanner';
import AboutClub from '../../Components/AboutClub/AboutClub';
import Promotions from '../../Components/Promotions/Promotions';
import Location from '../../Components/Location/Location';
import Facilities from '../../Components/Facilities/Facilities';

const Home = () => {
    return (
        <>
          <FancyBanner></FancyBanner>
          <AboutClub></AboutClub>
          <Facilities></Facilities>
          <Promotions></Promotions>
          <Location></Location>
        </>
    );
};

export default Home;