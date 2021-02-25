import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getPosts} from '../../actions/post'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'
import {getCurrentTeam} from '../../actions/auth'
import {Link} from 'react-router-dom'

const Posts = ({getPosts, getCurrentTeam, post: {posts, loading}, auth: {user, currentTeam}}) => {

    useEffect(() => {
        if(user && user.code){
            getCurrentTeam(user.code);
            getPosts(user.code);
        }
    }, [getPosts, user])

    return loading ? <Spinner /> : (
        <Fragment>
            <h1 className='large text-primary'>Posts</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Welcome to the team <Link to={`/team/${currentTeam.code}`}><b><span className="text text-primary">{currentTeam.name}</span></b></Link>
            </p>
            <p className="lead">{currentTeam.description}</p>
            <PostForm />
            <div className='posts'>
                {posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </Fragment>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired, 
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getCurrentTeam: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    post: state.post, 
    auth: state.auth
})

export default connect(mapStateToProps, {getPosts, getCurrentTeam})(Posts)
