import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import {getTeamProfiles} from '../../actions/profile'
import  ProfileItem from './ProfileItem';
import {getCurrentTeam} from '../../actions/auth'
import {Link} from 'react-router-dom'

const Profiles = ({getTeamProfiles, getCurrentTeam, profile: {profiles, loading}, auth: {user, currentTeam}}) => {

    const[isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if(user && user.code!==""){
            getCurrentTeam(user.code);
            getTeamProfiles(user.code);
            var idx = user.teams.map(team=>team.code).indexOf(user.code);
            setIsAdmin(user.teams[idx].isAdmin);
        }
    }, [getTeamProfiles, user])

    return (
        <Fragment>
            {loading ? <Spinner /> : (
                <Fragment>
                    <h1 className="large text-primary">Team Members</h1>
                    <p className="lead">
                    {
                        currentTeam && (
                            <Fragment>
                                <i className="fab fa-connectdevelop"></i> Browse and connect with developers of the team <Link to={`/team/${user.code}`}><b><span className="text text-primary">{currentTeam.name}</span></b></Link>
                            </Fragment>
                        )
                    }
                    </p>
                    <div className="profiles">
                        {profiles.length>0 ? (
                            profiles.map(profile => (
                                <ProfileItem key={profile._id} profile={profile} isUserAdmin={isAdmin}/>
                            ))
                        ) : (<h4>No profiles found...</h4>)}
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

Profiles.propTypes = {
    getTeamProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getCurrentTeam: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {getTeamProfiles, getCurrentTeam})(Profiles)
