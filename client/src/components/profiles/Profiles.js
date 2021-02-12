import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import {getTeamProfiles} from '../../actions/profile'

const Profiles = ({getTeamProfiles, profile: {profiles, loading}, auth: {user}}) => {

    useEffect(() => {
        if(user && user.code!=""){
            getTeamProfiles(user.code);
        }
    }, [])

    return (
        <div>
            
        </div>
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
