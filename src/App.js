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
import UserLayout from './layouts/UserLayout';
import About from './pages/user/About';
import AdminLayout from './layouts/AdminLayout';
import Userslist from './pages/admin/user/Userslist';
import ProductList from './pages/admin/product/ProductList';
import ProductAdd from './pages/admin/product/ProductAdd';
import Products from './pages/user/Products';

function App(props) {
  useEffect(() => {
    createAdmin();
  }, []);
  return (
    <>
      <ToastContainer position="bottom-left" />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path={AUTH_ROUTE.LOGIN} element={<Login />} />
          <Route path={AUTH_ROUTE.REGISTER} element={<Register />} />
        </Route>

        <Route element={<PrivateRoute role={ROLES.USER} />}>
          <Route element={<UserLayout />}>
            <Route path={USER_ROUTE.HOME} element={<Home />} />
            <Route path={USER_ROUTE.ABOUT} element={<About />} />
            <Route path={USER_ROUTE.PRODUCTS} element={<Products />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute role={ROLES.ADMIN} />}>
          <Route element={<AdminLayout />}>
            <Route path={ADMIN_ROUTE.DASHBOARD} element={<Dashboard />} />
            <Route path={ADMIN_ROUTE.USER_LIST} element={<Userslist />} />
            <Route path={ADMIN_ROUTE.PRODUCT_ADD} element={<ProductAdd />} />
            <Route path={ADMIN_ROUTE.PRODUCT_LIST} element={<ProductList />} />
          </Route>
        </Route>

        <Route path={AUTH_ROUTE.ERROR} element={<Error />} />
      </Routes>
    </>
  );
}

export default App;