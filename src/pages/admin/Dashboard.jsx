import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../helper/AuthHelper';
import { AUTH_ROUTE } from '../../constant/RoutesConstant';

function Dashboard(props) {
    const navigate = useNavigate();
    return (
        <div className='py-5 text-center'>
            <h1 className='text-white'>Dashboard</h1>
            <button type='button' className='btn btn-primary' onClick={() => { authLogout(); navigate(AUTH_ROUTE.LOGIN) }}>Logout</button>
        </div>
    );
}

export default Dashboard;