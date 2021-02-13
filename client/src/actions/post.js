import axios from 'axios';
import {setAlert} from './alert'
import {
    GET_POSTS, 
    POST_ERROR
} from './types'

// Getting posts of a team
export const getPosts = code => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${code}`);
        dispatch({
            type: GET_POSTS, 
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR, 
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

