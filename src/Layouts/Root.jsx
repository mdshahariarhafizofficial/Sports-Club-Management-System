import React from 'react';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <>
        <header></header>
        <main>
          <Outlet></Outlet>
        </main>
        <footer></footer>
        </>
    );
};

export default Root;