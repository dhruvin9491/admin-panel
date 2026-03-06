import { toast } from "react-toastify";
import { DEFAULT_ADMIN, ROLES } from "../constant/CommonConstant";
import { STORAGE_KEYS } from "../constant/StorageConstant";
import { generateUniqId } from "./DataGeneratHelper";

export const createAdmin = () => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]").filter((user) => user.role !== ROLES.ADMIN);

    const admin = {
        id: generateUniqId(),
        name: DEFAULT_ADMIN.NAME,
        email: DEFAULT_ADMIN.EMAIL,
        mobile: DEFAULT_ADMIN.MOBILE,
        profileImage: DEFAULT_ADMIN.PROFILE_IMAGE || "",
        password: DEFAULT_ADMIN.PASSWORD,
        confirmPassword: DEFAULT_ADMIN.CONFIRMPASSWORD,
        role: DEFAULT_ADMIN.ROLE,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
        isDeleted: false,
        lastLoginTime: ""
    };

    users.push(admin);

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
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
    toast.success("Logout successful ✅");
}

export const deleteAccount = (id, role = ROLES.USER) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");

    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
        toast.error("Data not found to delete your account❌");
        return;
    }

    users[userIndex].isDeleted = true;
    users[userIndex].deletedBy = role;
    users[userIndex].updatedAt = new Date().toLocaleString();

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    toast.success("Account deleted successful ✅");

    authLogout();
}

export const recoverAccount = (id) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");

    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
        toast.error("Data not found to recover account❌");
        return;
    }

    users[userIndex].isDeleted = false;
    users[userIndex].deletedBy = null;
    users[userIndex].updatedAt = new Date().toLocaleString();

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    toast.success("Account recover successful ✅");
}



