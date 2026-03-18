import React from 'react';

function Alert({error}) {
    return (
        <div className='alert alert-danger text-center'>
            {error || "Something went wrong!"}
        </div>
    );
}

export default Alert;