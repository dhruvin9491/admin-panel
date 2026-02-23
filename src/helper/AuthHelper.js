import { DEFAULT_ADMIN, ROLES } from "../constant/CommonConstant";
import { STORAGE_KEYS } from "../constant/StorageConstant";

export const createAdmin = () => {
    let users = JSON.parse(localStorage.getItem("_users")) || [];

    users = users.filter((user) => user.role !== ROLES.ADMIN);

    const admin = {
        name: DEFAULT_ADMIN.NAME,
        email: DEFAULT_ADMIN.EMAIL,
        password: DEFAULT_ADMIN.PASSWORD,
        confirmPassword: DEFAULT_ADMIN.CONFIRMPASSWORD,
        role: DEFAULT_ADMIN.ROLE
    };
    users.push(admin);

    localStorage.setItem("_users", JSON.stringify(users));
}

export const checkLogin = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGIN_FLAG) || "false");
}

export const getLoggedInUser = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGIN_USER) || "null");
}

export const getLoggedInUserRole = () => {
    return getLoggedInUser()?.role || ROLES.USER;
};

export const authLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.LOGIN_FLAG);
    localStorage.removeItem(STORAGE_KEYS.LOGIN_USER);
}