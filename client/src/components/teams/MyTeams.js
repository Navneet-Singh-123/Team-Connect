import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {getAdminTeams} from '../../actions/auth'
import {connect} from 'react-redux'

const MyTeams = ({getAdminTeams}) => {

    useEffect(() => {
        getAdminTeams();
    }, [getAdminTeams])

    return (
        <div>
            <h1 className="large text-primary">Admin Teams</h1>
        </div>
    )
}

MyTeams.propTypes = {
    getAdminTeams: PropTypes.func.isRequired,
}

export default connect(null, {getAdminTeams})(MyTeams);
