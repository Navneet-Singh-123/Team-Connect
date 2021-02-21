import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_PROFILE,
    UPDATE_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE, 
    ACCOUNT_DELETED,
    GET_PROFILES, 
    GET_REPOS, 
    LEAVE_TEAM
} from './types'

// Get current user's profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE, 
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// This history object has a method called push that will redirect us to a client side route

// Create or update profile
export const createProfile = (formData, history, edit=false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post("/api/profile", formData, config);
        dispatch({
            type: GET_PROFILE, 
            payload: res.data
        })
        dispatch(setAlert(edit?"Profile Updated Successfully":"Profile Created Successfully", "success"))
        if(!edit){
            history.push("/dashboard");
        }

    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put("/api/profile/experience", formData, config);
        dispatch({
            type: UPDATE_PROFILE, 
            payload: res.data
        })
        dispatch(setAlert("Experience Added", "success"))
        history.push("/dashboard");

    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Add education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put("/api/profile/education", formData, config);
        dispatch({
            type: UPDATE_PROFILE, 
            payload: res.data
        })
        dispatch(setAlert("Education Added", "success"))
        history.push("/dashboard");

    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE, 
            payload: res.data
        })
        dispatch(setAlert("Experience Removed", "success"))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
// Delete education 
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE, 
            payload: res.data
        })
        dispatch(setAlert("Education Removed", "success"))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete Account and profile
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!!')){
        try {
            const res = await axios.delete(`/api/profile`);
            dispatch({ type: CLEAR_PROFILE })
            dispatch({ type: ACCOUNT_DELETED })
            dispatch(setAlert("Your Account has been permanently deleted"))
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR, 
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
    
}

// Get all profiles of a team
export const getTeamProfiles = (code) => async dispatch =>{
    try{
        const res = await axios.get(`/api/profile/${code}`);
        dispatch({
            type: GET_PROFILES, 
            payload: res.data
        })
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.statusText, status: err.response.status }
        })   
    }
}

// Get all profile by ID
export const getProfileById = (userId) => async dispatch =>{
    try{
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE, 
            payload: res.data
        })
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.statusText, status: err.response.status }
        })   
    }
}

// Get GitHub repos
export const getGithubRepos = (username) => async dispatch =>{
    try{
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS, 
            payload: res.data
        })
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR, 
            payload: { msg: err.response.statusText, status: err.response.status }
        })   
    }
}

// Leave a particular team
export const leaveTeam = (code, history) => async dispatch =>{
    try{
        const res = await axios.get(`/api/teams/leave/${code}`);
        dispatch({
            type: LEAVE_TEAM
        })
        dispatch(setAlert(res.data.msg, "success"));
        history.push("/dashboard");
    }
    catch(err){
        dispatch(setAlert("Something went wrong!! Couldn't complete the desired action", "danger"))
    }
}