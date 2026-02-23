import React from 'react';
import { authLogout } from '../../helper/AuthHelper';
import { useNavigate } from 'react-router-dom';
import { AUTH_ROUTE } from '../../constant/RoutesConstant';

function Home(props) {
    const navigate = useNavigate();
    return (
        <div className='py-5 text-center'>
            <h1 className='text-white'>Home</h1>
            <button type='button' className='btn btn-primary' onClick={() => { authLogout(); navigate(AUTH_ROUTE.LOGIN) }}>Logout</button>
        </div>
    );
}

export default Home;   