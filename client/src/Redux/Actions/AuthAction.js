import axios from 'axios'
import getError from '../../Components/utile';
import { UserAction } from './../Slices/UserSlice';
import { AllUsersAction } from './../Slices/AllUsers';
const url = process.env.REACT_APP_API_KEY

export const SignIn = (email, password, navigate) => async (dispatch) => {
    try {
        const res = await axios.post(`${url}/api/auth/signin`, { email, password }, { withCredentials: true });
        localStorage.setItem('Logged?', true)
        dispatch(UserAction.LoggedIn(res.data));
        dispatch(UserAction.AccessToken(res.data.token));
        navigate('/');
    } catch (error) {
        dispatch(UserAction.Failed_LogIn(getError(error)));
    }
}
export const SignUp = (email, password, username, lastname, firstname, confirmpassword, navigate) => async (dispatch) => {
    try {
        const config = {
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        };
        const res = await axios.post(`${url}/api/auth/signup`, { email, password, username, lastname, firstname, confirmpassword }, config);
        dispatch(UserAction.Register(res.data));
        navigate('/signin');
    } catch (error) {
        dispatch(UserAction.Failed_LogIn(getError(error)));
    }
};
export const FetchAllUsers = () => async (dispatch) => {
    try {
        dispatch(AllUsersAction.Fetch_getAllUsers());
        const Users = await axios.get(`${url}/api/auth/users`);
        dispatch(AllUsersAction.getAllUsers(Users.data));
    } catch (error) {
        dispatch(AllUsersAction.Fail_getAllUsers(getError(error)))
    }
};
export const Fetch_Logged_User = () => async (dispatch) => {
    try {

        // dispatch(UserAction.Fetch_getAllUsers());
        const Users = await axios.get(`${url}/api/auth/info`);
        dispatch(UserAction.GetUserInfo(Users.data));
        if (Users.data.isAdmin === true) {
            localStorage.setItem('isAdmin?', true);
        }
    } catch (error) {
        dispatch(UserAction.Failed_Fetch(getError(error)))
    }
};
export const Fetch_User_Details = (id) => async (dispatch) => {
    dispatch(UserAction.Fetch_UserDetails_Request())
    try {
        const result = await axios.get(`${url}/api/auth/get/${id}`);
        dispatch(UserAction.Fetch_UserDetails_Success(result.data));
    } catch (error) {
        dispatch(UserAction.Fetch_UserDetails_Fails(getError(error)));
    }
};
export const Delete_User = (id) => async (dispatch) => {
    try {
        dispatch(AllUsersAction.Delete_User_Request());
        const Users = await axios.delete(`${url}/api/auth/deleteuser/${id}`);
        dispatch(AllUsersAction.Delete_User_Success(Users.data));
    } catch (error) {
        dispatch(AllUsersAction.Delete_User_Fails(getError(error)));
    }
}
