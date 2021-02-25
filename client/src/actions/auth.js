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
    ENTER_TEAM,
    SET_CODE,
    GET_ADMIN_TEAMS,
    CREATE_TEAM,
    DELETE_TEAM, 
    GET_CURRENT_TEAM, 
    EDIT_TEAM_DETAILS
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

// Set code for the current team 
export const setCurCode = (code) => async dispatch => {
    try{
        const res = await axios.put(`api/profile/change/${code}`);
        dispatch({
            type: SET_CODE, 
            payload: res.data
        })
    }
    catch(err){
        dispatch(setAlert(err.response.data, 'danger'))
    }
}

// Getting the admin Teams
export const getAdminTeams = () => async dispatch => {
    try{
        const res = await axios.get('api/teams/admin');
        dispatch({
            type: GET_ADMIN_TEAMS, 
            payload: res.data
        })
    }
    catch(err){
        dispatch(setAlert(err.response.data, 'danger'))
    }
}

// Creating team
export const createTeam = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post("/api/teams", formData, config);
        dispatch({
            type: CREATE_TEAM, 
            payload: res.data
        })
        dispatch(setAlert("Team Created", "success"));
        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch(setAlert(err.response.data, 'danger'))
    }
}

// Deleting team
export const deleteTeam = (id, history) => async dispatch => {
    try {
        const res = await axios.delete(`/api/teams/${id}`);
        console.log(res);
        dispatch({
            type: DELETE_TEAM, 
        })
        dispatch(setAlert(res.data.msg, "success"))
        history.push("/dashboard");
    } catch (err) {
        dispatch(setAlert("Something went wrong", 'danger'))
    }
}

// Getting current Team 
export const getCurrentTeam = code => async dispatch => {
    try {
        const res = await axios.get(`/api/teams/current/${code}`);
        dispatch({
            type: GET_CURRENT_TEAM, 
            payload: res.data
        })
    } catch (err) {
        dispatch(setAlert("Somthing went wrong !!", 'danger'))
    }
}

// Getting current team by id
export const getCurrentTeamById = id => async dispatch => {
    try {
        const res = await axios.get(`/api/teams/current/byId/${id}`);
        dispatch({
            type: GET_CURRENT_TEAM, 
            payload: res.data
        })
    } catch (err) {
        dispatch(setAlert("Somthing went wrong !!", 'danger'))
    }
}

// Edit Team details
export const editTeamDetails = (id, teamDetails, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put(`/api/teams/edit/${id}`, teamDetails, config);
        dispatch({
            type: EDIT_TEAM_DETAILS, 
            payload: res.data
        })
        dispatch(setAlert("Team Details Updated", 'success'));
    } catch (err) {
        dispatch(setAlert("Somthing went wrong !!", 'danger'))  
    }
}