import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { AUTH_ROUTE } from '../constant/RoutesConstant';
import { ROLES } from '../constant/CommonConstant';

function Register() {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Minimum 2 characters")
                .required("Name is required"),

            email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),

            password: Yup.string()
                .min(5, "Minimum 5 characters")
                .required("Password is required"),

            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm password is required")
        }),
        onSubmit: (values, { resetForm }) => {

            const users = JSON.parse(localStorage.getItem("_users")) || [];

            const isExist = users.find(user => user.email === values.email);

            if (isExist) {
                toast.error("Email already registered ❌");
                return;
            }

            users.push({...values, role: ROLES.USER});
            
            localStorage.setItem("_users", JSON.stringify(users));

            toast.success("Registration successful 🎉");
            
            navigate(AUTH_ROUTE.LOGIN);

            resetForm();
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
                            <h2 className="text-center my-3">Register</h2>
                        </div>

                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit} autoComplete="off">

                                <div className="position-relative mb-4">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className={getInputClass("name")}
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.name && formik.errors.name && (
                                        <span className="invalid-feedback position-absolute top-100 start-0 m-0">
                                            {formik.errors.name}
                                        </span>
                                    )}
                                </div>

                                <div className="position-relative mb-4">
                                    <label className="form-label">Email</label>
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

                                <div className="position-relative mb-4">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        autoComplete="new-password"
                                        className={getInputClass("confirmPassword")}
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                        <span className="invalid-feedback position-absolute top-100 start-0 m-0">
                                            {formik.errors.confirmPassword}
                                        </span>
                                    )}
                                </div>

                                <button type="submit" className="btn btn-success w-100">
                                    Create Account
                                </button>

                            </form>
                        </div>

                        <div className="card-footer text-center">
                            Already have an account?
                            <Link to={AUTH_ROUTE.LOGIN}> Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
