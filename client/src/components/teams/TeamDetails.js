import React, {useEffect, Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentTeam, deleteTeam} from '../../actions/auth'
import Spinner from '../layout/Spinner';
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'

const TeamDetails = ({auth: {currentTeam, user, loading}, getCurrentTeam, history, deleteTeam}) => {

    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        if(user && user.code){
            getCurrentTeam(user.code);
            isAdminCurTeam(user._id)
        }
    }, [getCurrentTeam, user])

    const isAdminCurTeam = async (userId) => {
        // Check if that particular user is an admin of the current team
        const res = await axios.get(`/api/teams/check/${user.code}/${userId}`);
        setAdmin(res.data.msg);
    }
 
    return (
        <Fragment>
            {loading || currentTeam===null ? <Spinner /> : (
                <Fragment>
                    <h1 className="large text-primary">{currentTeam.name}</h1>
                    <p className="lead">{currentTeam.description}</p>
                    <p className="lead">Number of Members: {currentTeam.members.length}</p>
                    {admin && (
                        <Fragment>
                            <button className="btn btn-danger" onClick={()=>deleteTeam(currentTeam._id, history)}>Delete Team</button>
                            <Link to={`/team/edit/${currentTeam._id}`} className="btn btn-dark">Edit Details</Link>
                        </Fragment>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

TeamDetails.propTypes = {
    auth: PropTypes.object.isRequired,
    getCurrentTeam: PropTypes.func.isRequired,
    deleteTeam: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {getCurrentTeam, deleteTeam})(withRouter(TeamDetails));
