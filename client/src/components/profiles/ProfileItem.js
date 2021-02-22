import React from 'react'
import {Link} from 'react-router-dom' 
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const ProfileItem = ({auth, profile: {
    user: {_id, name, avatar}, 
    status, 
    company, 
    location, 
    skills
}}) => {

    const isAdminCurTeam = (userId) => {
        var teamIdx = auth.user.teams.map(team=>team.code).indexOf(auth.user.code);
        console.log(auth.user.team[teamIdx]);
    }

    return (
        <div className="profile bg-light">
            
            <img src={avatar} alt="Profile" className="round-img"/>
            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span>at {company}</span>}</p>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
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
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(ProfileItem)
