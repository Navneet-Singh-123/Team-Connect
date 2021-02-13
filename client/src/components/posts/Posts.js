import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getPosts} from '../../actions/post'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../actions/profile';

const Posts = ({getPosts, post: {posts, loading}, auth: {user}}) => {

    useEffect(() => {
        if(user && user.code){
            getPosts(user.code);
        }
    }, [])

    return (
        <div>
            
        </div>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired, 
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post, 
    auth: state.auth
})

export default connect(mapStateToProps, {getPosts})(Posts)
