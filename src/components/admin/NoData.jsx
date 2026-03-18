import React from 'react';

function NoData({ type }) {
    return (
        <div className='text-center py-5 text-dark'>
            <h5 className='mb-0'>{`${type ? type.charAt(0).toUpperCase() + type.slice(1) : "Data"} not found`}</h5>
        </div>
    );
}

export default NoData;