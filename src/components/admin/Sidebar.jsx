import React, { useState } from "react";
import { ADMIN_ROUTE } from "../../constant/RoutesConstant";
import { NavLink, useNavigate } from "react-router-dom";
import { authLogout } from "../../helper/AuthHelper";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory2";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// Sub Icons
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";

function Sidebar() {
    const navigate = useNavigate();
    const [expandedMenu, setExpandedMenu] = useState(null);

    const toggleMenu = (menuName) => {
        setExpandedMenu(expandedMenu === menuName ? null : menuName);
    };

    return (
        <div className="sidebar bg-primary text-white d-flex flex-column py-3" style={{ width: 250 }}>
            <nav className="nav flex-column sidebar-nav">

                {/* Dashboard */}
                <NavLink
                    to={ADMIN_ROUTE.DASHBOARD}
                    className="nav-link d-flex align-items-center gap-3 text-white sidebar-link"
                >
                    <DashboardIcon />
                    <span>Dashboard</span>
                </NavLink>

                {/* Users Section */}
                <div className="mt-3">
                    <button
                        className="nav-link w-100 d-flex align-items-center justify-content-between text-white bg-transparent border-0 sidebar-parent"
                        onClick={() => toggleMenu("users")}
                    >
                        <div className="d-flex align-items-center gap-3">
                            <PeopleIcon />
                            <span>Users</span>
                        </div>
                        {expandedMenu === "users" ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </button>

                    {expandedMenu === "users" && (
                        <div className="submenu px-3">
                            <NavLink
                                to={ADMIN_ROUTE.USER_ADD}
                                className="nav-link d-flex align-items-center gap-3 text-white sidebar-sublink"
                            >
                                <PersonAddIcon fontSize="small" />
                                <span>Add User</span>
                            </NavLink>

                            <NavLink
                                to={ADMIN_ROUTE.USER_LIST}
                                className="nav-link d-flex align-items-center gap-3 text-white sidebar-sublink"
                            >
                                <GroupIcon fontSize="small" />
                                <span>User List</span>
                            </NavLink>

                            <NavLink
                                to={ADMIN_ROUTE.USER_UPDATE}
                                className="nav-link d-flex align-items-center gap-3 text-white sidebar-sublink"
                            >
                                <EditIcon fontSize="small" />
                                <span>Update User</span>
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* Products Section */}
                <div className="mt-3">
                    <button
                        className="nav-link w-100 d-flex align-items-center justify-content-between text-white bg-transparent border-0 sidebar-parent"
                        onClick={() => toggleMenu("products")}
                    >
                        <div className="d-flex align-items-center gap-3">
                            <InventoryIcon />
                            <span>Products</span>
                        </div>
                        {expandedMenu === "products" ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </button>

                    {expandedMenu === "products" && (
                        <div className="submenu px-3">
                            <NavLink
                                to={ADMIN_ROUTE.PRODUCT_ADD}
                                className="nav-link d-flex align-items-center gap-3 text-white sidebar-sublink"
                            >
                                <AddBoxIcon fontSize="small" />
                                <span>Add Product</span>
                            </NavLink>

                            <NavLink
                                to={ADMIN_ROUTE.PRODUCT_LIST}
                                className="nav-link d-flex align-items-center gap-3 text-white sidebar-sublink"
                            >
                                <InventoryIcon fontSize="small" />
                                <span>Product List</span>
                            </NavLink>
                        </div>
                    )}
                </div>
            </nav>

            <div className="mt-auto pt-4 px-3">
                <button
                    className="btn btn-outline-light w-100 d-flex align-items-center gap-3 justify-content-center"
                    onClick={() => {
                        authLogout();
                        navigate("/login");
                    }}
                >
                    <ExitToAppIcon />
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;