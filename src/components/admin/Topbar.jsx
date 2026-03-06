import React from 'react';
import { getLoggedInUser } from '../../helper/AuthHelper';

function Topbar() {
    const { name = 'Guest', profileImage = null } = getLoggedInUser();

    return (
        <header className='border-2 border-bottom border-white px-4 d-flex align-items-center justify-content-between bg-primary'>
            <img style={{ width: 175 }} src="https://coursetakers.com/img/uploads/school_images_temp/121e6ae44f8e4837f635df226ededc5b.jpg" alt="Add Zero Group" />

            <div className='d-flex align-items-center my-3'>
                {profileImage ? (
                    <img src={profileImage} alt="profile" className='rounded-circle me-2' style={{ width: 40, height: 40 }} />
                ) : (
                    <div className='rounded-circle bg-dark text-white d-flex align-items-center justify-content-center me-2' style={{ width: 40, height: 40 }}>{(name[0] || 'G').toUpperCase()}</div>
                )}
                <div className='text-white'>{name}</div>
            </div>
        </header>
    );
}

export default Topbar;