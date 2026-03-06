import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { DEFAULT_ADMIN, ROLES } from '../constant/CommonConstant';
import { ADMIN_ROUTE, AUTH_ROUTE, USER_ROUTE } from '../constant/RoutesConstant';
import { STORAGE_KEYS } from '../constant/StorageConstant';
import * as Yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { getInputClass } from '../helper/UiHelper';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required("Email is required"),
            password: Yup.string().min(5).required("Password is required")
        }),
        onSubmit: (values) => {

            const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || " []");

            const userIndex = users.findIndex(u => u.email === values.email && u.password === values.password);
            if (userIndex === -1) {
                toast.error("Invalid email or password ❌");
                return;
            }

            const checkDeleted = users.findIndex(u => u.email === values.email && u.isDeleted === true);
            if (checkDeleted !== -1) {
                toast.warning(`Your account has been Delete. Please contact ${DEFAULT_ADMIN.EMAIL} here to recover your account`);
                return;
            }

            users[userIndex].lastLoginTime = new Date().toLocaleString();
            users[userIndex].updatedAt = new Date().toLocaleString();

            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

            localStorage.setItem(STORAGE_KEYS.LOGIN_FLAG, JSON.stringify(true));
            localStorage.setItem(STORAGE_KEYS.LOGIN_USER, JSON.stringify(users[userIndex]));

            toast.success("Login successful ✅");

            navigate(users[userIndex]?.role === ROLES.ADMIN ? ADMIN_ROUTE.DASHBOARD : USER_ROUTE.HOME);
        }

    });

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10 col-12">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-center my-3">Login</h2>
                        </div>

                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit} autoComplete="off">

                                <div className="position-relative mb-4">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={getInputClass(formik, "email")}
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <span className="invalid-feedback position-absolute top-100 start-0 m-0">
                                            {formik.errors.email}
                                        </span>
                                    )}
                                </div>

                                <div className="position-relative mb-4">
                                    <label>Password</label>
                                    <div className='input-group'>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            autoComplete="new-password"
                                            className={getInputClass(formik, "password")}
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.password && formik.errors.password && (
                                            <span className="invalid-feedback position-absolute top-100 start-0 m-0">
                                                {formik.errors.password}
                                            </span>
                                        )}
                                        <button type='button' className='btn btn-outline-secondary' onClick={() => setShowPassword(s => !s)} aria-label='Toggle password visibility'>
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </button>
                                    </div>

                                </div>

                                <button className="btn btn-primary w-100">
                                    Sign In
                                </button>

                            </form>
                        </div>

                        <div className="card-footer text-center">
                            Create new account
                            <Link to={AUTH_ROUTE.REGISTER}> Sign up</Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
