import React from 'react';
import Header from '../components/user/Header';
import Footer from '../components/user/Footer';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserLayout(props) {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default UserLayout;