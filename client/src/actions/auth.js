import axios from 'axios'
import {setAlert} from './alert'
import {
    REGISTER_FAIL, 
    REGISTER_SUCCESS,
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_FAIL, 
    LOGIN_SUCCESS, 
    LOGOUT, 
    CLEAR_PROFILE, 
    GET_USER_TEAMS, 
    ENTER_TEAM
} from './types.js'
import setAuthToken from '../utils/setAuthToken';

// Load user
export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get("/api/auth");
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password});
    try {
        const res = await axios.post("/api/users", body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// Login User
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password});
    try {
        const res = await axios.post("/api/auth", body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// Logout
export const logout = () => dispatch => {
    dispatch({type: CLEAR_PROFILE})
    dispatch({type: LOGOUT})
}

// Get user teams
export const getUserTeams = () => async dispatch => {
    try{
        const res = await axios.get("/api/teams");
        dispatch({
            type: GET_USER_TEAMS,
            payload: res.data
        })
    }
    catch(err){
        dispatch(setAlert(err.response.data, 'danger'))
    }
}

// Register for a team
export const registerTeam = ({code}) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({code});
    try{
        const res = await axios.post("/api/teams/enter", body, config);
        dispatch({
            type: ENTER_TEAM
        })
        dispatch(setAlert("You are successfully registered in this team. Please refresh the page to view changes" ,"success"));
        dispatch(loadUser());
    }
    catch(err){
        dispatch(setAlert(err.response.data.msg, 'danger'))
    }
}