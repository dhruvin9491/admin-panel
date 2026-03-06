import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../helper/AuthHelper';
import { AUTH_ROUTE } from '../../constant/RoutesConstant';

function Dashboard(props) {
    const navigate = useNavigate();
    return (
        <div className='py-5 text-center text-dark'>
            <div className='bg-white p-4 rounded shadow'>
                <h1 className='text-primary'>Dashboard</h1>
            </div>
        </div>
    );
}

export default Dashboard;