import React from 'react';
import FancyBanner from '../../Components/FancyBanner/FancyBanner';
import AboutClub from '../../Components/AboutClub/AboutClub';
import Promotions from '../../Components/Promotions/Promotions';
import Location from '../../Components/Location/Location';
import Facilities from '../../Components/Facilities/Facilities';
import PopularCourts from '../../Components/PopularCourts/PopularCourts';

const Home = () => {
    return (
        <>
          <FancyBanner></FancyBanner>
          <AboutClub></AboutClub>
          <Facilities></Facilities>
          <PopularCourts></PopularCourts>
          <Promotions></Promotions>
          <Location></Location>
        </>
    );
};

export default Home;