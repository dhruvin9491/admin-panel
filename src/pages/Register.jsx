import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { AUTH_ROUTE } from '../constant/RoutesConstant';
import { ROLES } from '../constant/CommonConstant';
import { STORAGE_KEYS } from '../constant/StorageConstant';
import { generateUniqId } from '../helper/DataGeneratHelper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { getInputClass } from '../helper/UiHelper';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            mobile: "",
            profileImage: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2, "Minimum 2 characters").required("Name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().min(5, "Minimum 5 characters").required("Password is required"),
            confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm password is required"),
            mobile: Yup.string().required("Mobile number is required").matches(/^[6-9]\d{9}$/, "Enter a valid Indian mobile number")
        }),
        onSubmit: (values, { resetForm }) => {
            const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
            
            const userIndex = users.findIndex(user => user.email === values.email);
            if (userIndex !== -1) {
                toast.error("Email already registered ❌");
                return;
            }

            users.push({
                id: generateUniqId(),
                name: values.name,
                email: values.email,
                mobile: values.mobile || "",
                profileImage: values.profileImage || "",
                password: values.password,
                confirmPassword: values.confirmPassword,
                role: ROLES.USER,
                createdAt: new Date().toLocaleString(),
                updatedAt: new Date().toLocaleString(),
                isDeleted: false,
                deletedBy: null,
                lastLoginTime: ""
            });

            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

            toast.success("Registration successful 🎉");

            navigate(AUTH_ROUTE.LOGIN);

            resetForm();
        }

    });

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10 col-12">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-center my-3">Register</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit} autoComplete="off">
                                <div className='row gy-4 gx-3'>
                                    <div className='col-12'>
                                        <label className="form-label">Name</label>
                                        <div className="position-relative">
                                            <input type="text" name="name"
                                                className={getInputClass(formik, "name")}
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.name && formik.errors.name && (
                                                <span className="invalid-feedback position-absolute top-100 start-0 m-0">{formik.errors.name}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <label className="form-label">Email</label>
                                        <div className="position-relative">
                                            <input type="email" name="email"
                                                className={getInputClass(formik, "email")}
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.email && formik.errors.email && (
                                                <span className="invalid-feedback position-absolute top-100 start-0 m-0">{formik.errors.email}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <label className="form-label">Mobile</label>
                                        <div className="position-relative">
                                            <input type="tel" name="mobile" maxLength="10"
                                                className={getInputClass(formik, "mobile")}
                                                value={formik.values.mobile}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.mobile && formik.errors.mobile && (
                                                <span className="invalid-feedback position-absolute top-100 start-0 m-0">{formik.errors.mobile}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <label className="form-label">Profile Image</label>
                                        <div className="position-relative">
                                            <input type="file" name="profileImage" accept="image/*" className="form-control"
                                                onChange={(e) => {
                                                    const file = e.currentTarget.files && e.currentTarget.files[0];
                                                    if (!file) return;
                                                    if (file.size > 1024 * 1024 * 2) { // 2MB
                                                        toast.error('Image too large. Max 2MB');
                                                        return;
                                                    }
                                                    const reader = new FileReader();
                                                    reader.onload = () => {
                                                        formik.setFieldValue('profileImage', reader.result);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }}
                                            />
                                            <div className='form-text'>Recommended max size: 2MB. Optional.</div>
                                            {formik.values.profileImage && (
                                                <img src={formik.values.profileImage} alt="preview" className="rounded-circle mt-2" style={{ width: 48, height: 48 }} />
                                            )}
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <label className="form-label">Password</label>
                                        <div className='input-group position-relative'>
                                            <input name="password" autoComplete="new-password"
                                                type={showPassword ? 'text' : 'password'}
                                                className={getInputClass(formik, "password")}
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.password && formik.errors.password && (
                                                <span className="invalid-feedback position-absolute top-100 start-0 m-0">{formik.errors.password}</span>
                                            )}
                                            <button type='button' className='btn btn-outline-secondary' onClick={() => setShowPassword(s => !s)} aria-label='Toggle password visibility'>
                                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </button>
                                        </div>

                                    </div>
                                    <div className='col-md-6'>
                                        <label className="form-label">Confirm Password</label>
                                        <div className='input-group position-relative'>
                                            <input name="confirmPassword" autoComplete="new-password"
                                                type={showConfirm ? 'text' : 'password'}
                                                className={getInputClass(formik, "confirmPassword")}
                                                value={formik.values.confirmPassword}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                                <span className="invalid-feedback position-absolute top-100 start-0 m-0">{formik.errors.confirmPassword}</span>
                                            )}
                                            <button type='button' className='btn btn-outline-secondary' onClick={() => setShowConfirm(s => !s)} aria-label='Toggle password visibility'>
                                                {showConfirm ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <button type="submit" className="btn btn-success w-100">Create Account</button>
                                    </div>
                                </div>
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
