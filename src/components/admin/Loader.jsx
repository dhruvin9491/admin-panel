import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function Loader(props) {
    return (
        <div className='text-center py-5'>
            <CircularProgress />
            <p>Loading...</p>
        </div>
    );
}

export default Loader;