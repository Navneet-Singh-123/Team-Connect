import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentTeam} from '../../actions/auth'

const TeamDetails = ({auth: {currentTeam, user}, getCurrentTeam}) => {

    useEffect(() => {
        if(user && user.code){
            getCurrentTeam(user.code);
        }
    }, [getCurrentTeam, user])

    return (
        <Fragment>
            <h1 className="large text-primary">{currentTeam.name}</h1>
            <p className="lead">{currentTeam.description}</p>
            <p className="lead">Number of Members: {currentTeam.members.length}</p>
            
        </Fragment>
    )
}

TeamDetails.propTypes = {
    auth: PropTypes.object.isRequired,
    getCurrentTeam: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {getCurrentTeam})(TeamDetails)
