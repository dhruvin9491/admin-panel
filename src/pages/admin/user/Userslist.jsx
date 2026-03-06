import React, { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../../../constant/StorageConstant';
import { ROLES } from '../../../constant/CommonConstant';
import { deleteAccount, recoverAccount } from '../../../helper/AuthHelper';

function Userslist(props) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
        let data = userData.filter(user => user.role === ROLES.USER);
        setUsers(data);
    }, []);

    return (
        <div className='table-responsive bg-white p-3 rounded shadow'>
            {users.length === 0 ? (
                <div className='text-center py-5 text-dark'>
                    <h5 className='mb-0'>No users found</h5>
                </div>
            ) : (
                <table className='table table-striped table-bordered w-100 text-dark align-middle'>
                    <thead>
                        <tr>
                            <th>Created At</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Role</th>
                            <th>Last Login</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id || index}>
                                <td>{user.createdAt || '-'}</td>
                                <td>{user.profileImage ? <img src={user.profileImage} alt="p" style={{ width: 36, height: 36 }} className='rounded-circle' /> : '-'}</td>
                                <td>{user.name || '-'}</td>
                                <td>{user.email || '-'}</td>
                                <td>{user.mobile || '-'}</td>
                                <td>{user.role || ROLES.USER}</td>
                                <td>{user.lastLoginTime || '-'}</td>
                                <td>
                                    <button className='btn btn-sm btn-primary me-2'>Edit</button>
                                    {user.isDeleted ?
                                        <button className='btn btn-sm btn-success' onClick={() => recoverAccount(user.id)}>Recover</button>
                                        :
                                        <button className='btn btn-sm btn-danger' onClick={() => deleteAccount(user.id, ROLES.ADMIN)}>Delete</button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Userslist;