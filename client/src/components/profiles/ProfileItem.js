import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom' 
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import {makeAdmin, removeAdmin, removeUser} from '../../actions/profile'

const ProfileItem = ({auth, isUserAdmin, makeAdmin, removeAdmin, removeUser, profile: {
    user: {_id, name, avatar}, 
    status, 
    company, 
    location, 
    skills
}}) => {

    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        isAdminCurTeam(_id);
    }, [])

    const isAdminCurTeam = async (userId) => {
        // Check if that particular user is an admin of the current team
        const res = await axios.get(`/api/teams/check/${auth.user.code}/${userId}`);
        setAdmin(res.data.msg);
    }

    return (
        <div className="profile bg-light">
            
            <img src={avatar} alt="Profile" className="round-img"/>
            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span>at {company}</span>}</p>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
                {isUserAdmin && auth.user._id!==_id && !admin && (
                    <button className="btn btn-dark" onClick={()=>makeAdmin(auth.user.code, _id)}>Make Admin</button>
                )}
                {isUserAdmin && auth.user._id!==_id && admin && (
                    <button className="btn btn-dark" onClick={()=>removeAdmin(auth.user.code, _id)}>Dismiss as Admin</button>
                )}
                {isUserAdmin && auth.user._id!==_id && (
                    <button className="btn btn-danger" onClick={()=>removeUser(auth.user.code, _id)}>Remove</button>
                )}
            </div>
            <ul>
            {skills.slice(0, 4).map((skill, index) => (
                <li key={index} className='text-primary'>
                    <i className='fas fa-check' /> {skill}
                </li>
            ))}
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    isUserAdmin: PropTypes.bool,
    makeAdmin: PropTypes.func.isRequired,
    removeAdmin: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {makeAdmin, removeAdmin, removeUser})(ProfileItem)
