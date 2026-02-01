import axios from "axios";
import { toast } from "react-toastify";
import config from "../../src/config/config";
import Router from "next/router";

export const baseURL = `${config.backEndUrl}/api/`;
export const headerJson = (contentTypeReq) => {
    const accessToken = localStorage.getItem('accessTokenUser');
    //console.log('fronside',accessToken);
    let contentType = "application/json";
    if(typeof contentTypeReq !== 'undefined' && contentTypeReq != ''){
        return {
            "Content-Type": contentType,
            "Content-Type": contentTypeReq,
            'Access-Control-Allow-Origin': '*',
            'accesstoken': `${accessToken}` // Include access token in headers
        };
    }else{
        return {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'accesstoken': `${accessToken}` // Include access token in headers
        };
    }    
};


axios.defaults.withCredentials = false;
const Api = axios.create({
    baseURL: `${baseURL}`,
    timeout: 30000,
    withCredentials: false,
    credentials: "include",
});
Api.interceptors.response.use(
    function (response) {
        if (response?.data?.error) {
            toast.warning(response.data.error);
            return response;
        }
        return response;
        // should be edit ....
    },
    async function (error) {
        let errorMessage = "";
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
                errorMessage = error.response.data.message;
                toast.warning(errorMessage);
                
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
                Router.push('/admin/auth/sign-in'); // Redirect to login page
                return Promise.reject(error);
            }
            if (status === 403) {
                return false;
            }
            if (status === 400) {
                errorMessage = error.response.data.message;
                toast.warning(errorMessage);
                return Promise.reject(error);
            }
            if (status === 404) {
                errorMessage = error.response.data.message;
                toast.warning(errorMessage);
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export const getIntegrations = (body) => {
    return Api.get("integrations", body, { headers: headerJson() });
};

export const getSettings = (body) => {
    return Api.get("settings", body, { headers: headerJson() });
};

/* front user login */
export const userLogin = (body) => {
    return Api.post("user/login", body, { headers: headerJson() });
};

export const userRegister = (body) => {
    return Api.post("user/signup", body, { headers: headerJson("multipart/form-data") });
};

export const checkEmail = (body) => {
    return Api.post("user/checkEmail", body, { headers: headerJson() });
};

export const logoutFrontUser = (body) => {
    return Api.post("user/logout", body, { headers: headerJson() });
};
/* front user login */

/* admin user login */
export const loginUser = (body) => {
    return Api.post("adminuser/login", body, { headers: headerJson() });
};

export const logoutUser = (body) => {
    return Api.post("adminuser/logout", body, { headers: headerJson() });
};
/* admin user login */


/* contact us route */
export const saveContact = (body) => {
    return Api.post("contact/create", body, { headers: headerJson() });
};
export const getContactListData = (body) => {
    return Api.post("contact/getList", body, { headers: headerJson() });
};
export const getContactByIdData = (body) => {
    return Api.post("contact/getById", body, { headers: headerJson() });
};
export const updateContactStatus = (body) => {
    return Api.post("contact/update", body, { headers: headerJson() });
};
export const removeContactData = (body) => {
    return Api.post("contact/remove", body, { headers: headerJson() });
};
export const updateStatusContactData = (body) => {
    return Api.post("contact/status", body, { headers: headerJson() });
};
/* contact us route */


/* blog route */
export const saveBlogData = (body) => {
    return Api.post("blog/create", body, { headers: headerJson() }); //"multipart/form-data"
};
export const getBlogListData = (body) => {
    return Api.post("blog/getList", body, { headers: headerJson() });
};
export const getBlogByIdData = (body) => {
    return Api.post("blog/getById", body, { headers: headerJson() });
};
export const updateBlogData = (body) => {
    return Api.post("blog/update", body, { headers: headerJson() });
};
export const removeBlogData = (body) => {
    return Api.post("blog/remove", body, { headers: headerJson() });
};
export const updateStatusBlogData = (body) => {
    return Api.post("blog/status", body, { headers: headerJson() });
};
/* blog route */


/* user route */
export const saveUserData = (body) => {
    return Api.post("user/create", body, { headers: headerJson() });
};
export const getUserListData = (body) => {
    return Api.post("user/getList", body, { headers: headerJson() });
};
export const getUserByIdData = (body) => {
    return Api.post("user/getById", body, { headers: headerJson() });
};
export const updateUserData = (body) => {
    return Api.post("user/update", body, { headers: headerJson() });
};
export const removeUserData = (body) => {
    return Api.post("user/remove", body, { headers: headerJson() });
};
export const updateStatusUserData = (body) => {
    return Api.post("user/status", body, { headers: headerJson() });
};
/* user route */