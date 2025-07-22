import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Loader from '../Pages/Loading/Loader';

const Root = () => {
    const navigation = useNavigation();
    return (
        <>
        <header className='bg-black sticky top-0 z-50'>
            <Navbar></Navbar>
        </header>
        <main>
            <div className='min-h-[calc(100vh-589.36px)]'>
                {
                    navigation.state == "loading"? <Loader></Loader> : 
                    <Outlet></Outlet>
                }
            </div>
        </main>
        <footer>
            <Footer></Footer>
        </footer>
        </>
    );
};

export default Root;