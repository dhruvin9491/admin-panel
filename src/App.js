import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ADMIN_ROUTE, AUTH_ROUTE, USER_ROUTE } from './constant/RoutesConstant';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import Home from './pages/user/Home';
import { ROLES } from './constant/CommonConstant';
import Dashboard from './pages/admin/Dashboard';
import { createAdmin } from './helper/AuthHelper';

function App(props) {
  useEffect(() => {
    createAdmin();
  }, []);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path={AUTH_ROUTE.LOGIN} element={<Login />} />
          <Route path={AUTH_ROUTE.REGISTER} element={<Register />} />
        </Route>

        <Route element={<PrivateRoute role={ROLES.USER} />}>
           <Route path={USER_ROUTE.HOME} element={<Home />} />
        </Route>

        <Route element={<PrivateRoute role={ROLES.ADMIN} />}>
           <Route path={ADMIN_ROUTE.DASHBOARD} element={<Dashboard />} />
        </Route>

        <Route path={AUTH_ROUTE.ERROR} element={<Error />} />
      </Routes>
    </>
  );
}

export default App;