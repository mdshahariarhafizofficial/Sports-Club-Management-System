import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';

const Root = () => {
    return (
        <>
        <header>
            <Navbar></Navbar>
        </header>
        <main>
          <Outlet></Outlet>
        </main>
        <footer></footer>
        </>
    );
};

export default Root;