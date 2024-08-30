import { deleteCookie } from 'cookies-next';

const logout=async () => {
    deleteCookie("authToken");
    deleteCookie("userRole");
    return Promise.resolve();
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { logout };