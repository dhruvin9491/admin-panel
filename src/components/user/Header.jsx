import React from 'react';
import { getLoggedInUser } from '../../helper/AuthHelper';
import { Link, useNavigate } from 'react-router-dom';
import { USER_ROUTE } from '../../constant/RoutesConstant';

function Header() {
    const navigate = useNavigate();
    const { name = 'Guest', profileImage = null } = getLoggedInUser() || {};

    return (
        <header className="bg-secondary py-3 px-4">
            <div className="container">
                <div className="row align-items-center justify-content-between">

                    <div className="col-auto">
                        <h1 className="text-white m-0">AZG</h1>
                    </div>

                    <div className="col-auto">
                        <Link to={USER_ROUTE.PROFILE} className="d-flex align-items-center text-decoration-none gap-2">
                            <span className="text-white">{name}</span>
                            {profileImage
                                ? <img src={profileImage} alt="profile" className="rounded-circle" style={{ width: 40, height: 40, objectFit: 'cover' }} />
                                : <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>{(name[0] || 'G').toUpperCase()}</div>
                            }
                        </Link>
                    </div>

                </div>
            </div>
        </header>
    );
}

export default Header;