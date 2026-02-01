import axios from "axios";
import { toast } from "react-toastify";
import config from "../../src/config/config";
import Router from "next/router";

export const baseURLApi = `${config.backEndUrl}/api/`;
export const baseURL = `/data/`;

export const headerJson = () => {
    return {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
    };
};

export const headerJsonApi = (contentTypeReq) => {
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


const ApiNew = axios.create({
    baseURL: `${baseURLApi}`,
    timeout: 30000,
    withCredentials: false,
    credentials: "include",
});
ApiNew.interceptors.response.use(
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
                //toast.warning(errorMessage);
                
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
                window.location.href="/login";
                //Router.push('/login'); // Redirect to login page
                return Promise.reject(error);
            }
            if(status === 403) {
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

/* Family Tree New */
export const getTreeNew = (body) => {
    return ApiNew.post("family-tree/getTreeNew", body, { headers: headerJsonApi() });
};

export const appgetTree = (body) => {
    return ApiNew.post("family-tree/appgetTree", body, { headers: headerJsonApi() });
};
/* Family Tree */
export const getMembers = (body) => {
    return ApiNew.post("family-tree/getList", body, { headers: headerJsonApi() });
};

export const getParentList = (body) => {
    return ApiNew.post("family-tree/getParentList", body, { headers: headerJsonApi() });
};

export const saveMemberData = (body) => {
    return ApiNew.post("family-tree/create", body, { headers: headerJsonApi("multipart/form-data") });
};

export const UpdateMemberData = (body) => {
    return ApiNew.post("family-tree/update", body, { headers: headerJsonApi("multipart/form-data") });
};

// add this for delete member 26-04-2025
export const DeleteMemberData = (body) => {
    return ApiNew.post("family-tree/removeMember", body, { headers: headerJsonApi("multipart/form-data") });
};

// add this for undo action member //kishan sir
export const UndoMemberData = (body) => {
    return ApiNew.post("family-tree/undoMember", body, { headers: headerJsonApi("multipart/form-data") });
};
/* Family Tree */

// get Homepage
export const getHomeHeaderBannerPage = (body) => {
    return Api.get("home/header-banner-section.json", body, { headers: headerJson() });
};

export const getHomePageFeatures = (body) => {
    return Api.get("home/features-section.json", body, { headers: headerJson() });
};
export const getClientsReview = (body) => {
    return Api.get("home/clients-section.json", body, { headers: headerJson() });
};

export const getHomePageNumbers = (body) => {
    return Api.get("home/count-section.json", body, { headers: headerJson() });
};

export const getFamilyTreePage = (body) => {
    return Api.get("srx/header-section.json", body, { headers: headerJson() });
};

export const userFamilyTree = (body) => {
    return Api.get("dsca/header-section.json", body, { headers: headerJson() });
};


export const getIntegrations = (body) => {
    return Api.get("integrations.json", body, { headers: headerJson() });
};

export const getAboutPage = (body) => {
    return Api.get("about.json", body, { headers: headerJson() });
};

export const getContactPage = (body) => {
    return Api.get("contact.json", body, { headers: headerJson() });
};

export const getHomePageNews = (body) => {
    return Api.get("blog/blog-list.json", body, { headers: headerJson() });
};
