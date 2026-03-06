import React from 'react';
import { authLogout, deleteAccount, getLoggedInUser } from '../../helper/AuthHelper';
import { useNavigate } from 'react-router-dom';
import { AUTH_ROUTE } from '../../constant/RoutesConstant';
import { ROLES } from '../../constant/CommonConstant';

function Home(props) {
    const navigate = useNavigate();
    const user = getLoggedInUser() || {};

    return (
        <main>
            <section className='py-5 text-center'>
                <h1 className='text-white'>Home</h1>
                <div className='text-start text-white d-inline-block mt-3'>
                    {user.profileImage && (
                        <div className='mb-3'>
                            <img src={user.profileImage} alt='profile' className='rounded-circle' style={{ width: 96, height: 96 }} />
                        </div>
                    )}
                    <p><strong>Name:</strong> {user.name || '-'}</p>
                    <p><strong>Email:</strong> {user.email || '-'}</p>
                    <p><strong>Mobile:</strong> {user.mobile || '-'}</p>
                    <p><strong>Last Login:</strong> {user.lastLoginTime || '-'}</p>
                </div>

                <div className='mt-4'>
                    <button type='button' className='btn btn-primary me-2' onClick={() => { authLogout(); navigate(AUTH_ROUTE.LOGIN) }}>Logout</button>
                    <button type='button' className='btn btn-danger' onClick={() => deleteAccount(user.id, ROLES.USER)}>Delete Account</button>
                </div>
            </section>
        </main>
    );
}

export default Home;   