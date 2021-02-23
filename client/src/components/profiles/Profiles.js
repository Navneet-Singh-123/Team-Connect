import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import {getTeamProfiles} from '../../actions/profile'
import  ProfileItem from './ProfileItem';

const Profiles = ({getTeamProfiles, profile: {profiles, loading}, auth: {user}}) => {

    const[isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if(user && user.code!==""){
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
                        <i className="fab fa-connectdevelop"></i> Browse and connect with developers
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
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {getTeamProfiles})(Profiles)
