import React from 'react';
import Sidebar from '../components/admin/Sidebar';
import Topbar from '../components/admin/Topbar';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
    return (
        <div className="d-flex flex-column vh-100">
            <Topbar />
            <div className="d-flex flex-grow-1">
                <Sidebar />
                <div className="flex-fill p-4 bg-white overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;