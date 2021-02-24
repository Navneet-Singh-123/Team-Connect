import {
    REGISTER_FAIL, 
    REGISTER_SUCCESS, 
    USER_LOADED,
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT, 
    ACCOUNT_DELETED, 
    GET_USER_TEAMS,
    ENTER_TEAM,
    SET_CODE,
    GET_ADMIN_TEAMS, 
    CREATE_TEAM, 
    GET_CURRENT_TEAM
} from '../actions/types.js';

const initialState = {
    token: localStorage.getItem("token"), 
    isAuthenticated: null, 
    loading: true, 
    user: null, 
    myTeams: [], 
    adminTeams: [], 
    createdTeam: null, 
    currentTeam: null
}

export default function(state=initialState, action){
    const { type, payload } = action;
    switch(type){
        case USER_LOADED: 
            return {
                ...state, 
                isAuthenticated: true, 
                loading: false, 
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS: 
            localStorage.setItem("token", payload.token);
            return {
                ...state, 
                ...payload, 
                isAuthenticated: true, 
                loading: false
            }
        case REGISTER_FAIL:  
        case AUTH_ERROR: 
        case LOGIN_FAIL:
        case LOGOUT: 
        case  ACCOUNT_DELETED:
            localStorage.removeItem("token");
            return {
                ...state, 
                token: null,
                isAuthenticated: false, 
                loading: false, 
                myTeams: []
            } 
        case GET_USER_TEAMS: 
            return {
                ...state, 
                myTeams: payload
            }
        case ENTER_TEAM: 
            return {
                ...state
            }
        case SET_CODE: 
            return {
                ...state, 
                user: payload
            }
        case GET_ADMIN_TEAMS:
            return {
                ...state, 
                loading: false,
                adminTeams: payload 
            }
        case GET_CURRENT_TEAM: 
            return {
                ...state, 
                currentTeam: payload
            }
        case CREATE_TEAM: 
            return {
                ...state,
                loading: false, 
                createdTeam: payload
            }
        default: 
            return state
    }
}

