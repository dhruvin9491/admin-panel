import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROLES } from '../constant/CommonConstant';
import { ADMIN_ROUTE, USER_ROUTE } from '../constant/RoutesConstant';
import { checkLogin, getLoggedInUserRole } from '../helper/AuthHelper';

function PublicRoute(props) {
    const isLoggedIn = checkLogin();
    // const user = getLoggedInUser();
    const userRole = getLoggedInUserRole();

    if(isLoggedIn) return <Navigate to={userRole === ROLES.ADMIN ? ADMIN_ROUTE.DASHBOARD : USER_ROUTE.HOME} replace />

    return <Outlet />
   
}   

export default PublicRoute;