import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { ROLES } from '../constant/CommonConstant';
import { ADMIN_ROUTE, AUTH_ROUTE, USER_ROUTE } from '../constant/RoutesConstant';

function Login() {
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

            const users = JSON.parse(localStorage.getItem("_users")) || [];

            const user = users.find(
                u => u.email === values.email && u.password === values.password
            );

            if (!user) {
                toast.error("Invalid email or password ❌");
                return;
            }

            localStorage.setItem("_login_flag", JSON.stringify(true));
            localStorage.setItem("_login_user", JSON.stringify(user));

            toast.success("Login successful ✅");

            navigate(user?.role === ROLES.ADMIN ? ADMIN_ROUTE.DASHBOARD : USER_ROUTE.HOME);
        }

    });

    const getInputClass = (name) => {
        if (!formik.touched[name]) return "form-control";
        return formik.errors[name]
            ? "form-control is-invalid"
            : "form-control is-valid";
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-6">
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
                                        className={getInputClass("email")}
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
                                    <input
                                        type="password"
                                        name="password"
                                        autoComplete="new-password"
                                        className={getInputClass("password")}
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.password && formik.errors.password && (
                                        <span className="invalid-feedback position-absolute top-100 start-0 m-0">
                                            {formik.errors.password}
                                        </span>
                                    )}
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
