import React from 'react';
import { useNavigate } from 'react-router-dom';

function Error(props) {
    const navigate = useNavigate();
    return (
        <div className='container'>
            <div className='text-center py-5 text-dark vh-100'>
                <div className='bg-white p-4 rounded shadow h-100 d-flex align-items-center justify-content-center flex-column'>
                    <h1 className='text-primary'>Page Not Found</h1>
                    <button type='button' className='btn btn-primary' onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </div>
        </div>
    );
}

export default Error;