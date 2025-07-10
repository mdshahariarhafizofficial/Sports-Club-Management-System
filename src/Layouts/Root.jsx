import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const Root = () => {
    return (
        <>
        <header className='bg-black sticky top-0 z-50'>
            <Navbar></Navbar>
        </header>
        <main>
            <div className='min-h-[calc(100vh-567.67px)]'>
                <Outlet></Outlet>
            </div>
        </main>
        <footer>
            <Footer></Footer>
        </footer>
        </>
    );
};

export default Root;