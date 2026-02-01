package com.todistory.api;

public class ApiConstants {
    //public static String BASE_URL = "http://100.25.208.232:3001/api/";
    //public static String BASE_URL = "http://todistry.com:3001/api/";
    public static String BASE_URL = "https://todistry.com/api/api/";
    public static String SIGN_IN = BASE_URL + "user/login";
    public static String SIGN_UP = BASE_URL + "user/signup";
    public static String GET_TREE_DETAILS = BASE_URL + "family-tree/getTreeDetails";
    public static String CREATE_MEMBER = BASE_URL + "family-tree/create";
    public static String GET_MEMBER_DETAILS = BASE_URL + "family-tree/memberDetails";
    public static String UPDATE_MEMBER = BASE_URL + "family-tree/update";
    public static String GET_OTP_CHANGE_PASSWORD =   BASE_URL + "user/resetPassword";
    public static String VERIFY_OTP =   BASE_URL + "user/verifyResetPasswordCode";
    public static String UPDATE_PASSWORD =   BASE_URL + "user/updatePassword";
    public static String GET_PROFILE =   BASE_URL + "family-tree/profileDetails";
    public static String CHECK_EMAIL =   BASE_URL + "user/checkEmail";
    public static String REMOVE_MEMBER =   BASE_URL + "family-tree/removeMember";
    public static String UNDO_MEMBER =   BASE_URL + "family-tree/undoMember";
}
