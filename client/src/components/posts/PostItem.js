import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {addLike, removeLike, deletePost} from '../../actions/post'


const PostItem = ({post:{
    _id, 
    text, 
    name, 
    avatar,
    user, 
    likes, 
    comments, 
    date
}, auth, addLike, removeLike, deletePost, showActions}) => {
    return (
        <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {text}
            </p>
             <p class="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
            {showActions && (
              <Fragment>
                <button
                  onClick={() => addLike(_id)}
                  type='button'
                  className='btn btn-light'
                >
                  <i className='fas fa-thumbs-up' />{' '}
                  <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                </button>
                <button
                  onClick={() => removeLike(_id)}
                  type='button'
                  className='btn btn-light'
                >
                  <i className='fas fa-thumbs-down' />
                </button>
                <Link to={`/posts/${_id}`} className='btn btn-primary'>
                  Discussion{' '}
                  {comments.length > 0 && (
                    <span className='comment-count'>{comments.length}</span>
                  )}
                </Link>
                {!auth.loading && user === auth.user._id && (
                  <Fragment>
                    <button
                      onClick={() => deletePost(_id)}
                      type='button'
                      className='btn btn-danger'
                    >
                      <i className='fas fa-times' />
                    </button>
                  </Fragment>
                )}
              </Fragment>
            )}

          </div>
        </div>
    )
}


PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    showActions: PropTypes.bool
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {addLike, removeLike, deletePost})(PostItem)
