import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {getAdminTeams, deleteTeam} from '../../actions/auth'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner';

const MyTeams = ({getAdminTeams, auth: {adminTeams, loading}, deleteTeam}) => {

    useEffect(() => {
        getAdminTeams();
    }, [getAdminTeams])

    const AdminTeamsDisplay = adminTeams.map(team => (
        <tr key={team._id}>
            <td>{team.name}</td>
            <td>{team.code}</td>
            <td>
            <button
              className="btn btn-danger"
              onClick={()=>deleteTeam(team._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ));

    return (
        <div>
            <h1 className="large text-primary">Admin Teams</h1>
            {loading?<Spinner />:(
                <Fragment>
                    {
                        adminTeams.length===0 ?
                        <h2 className="text-dark">You are not admin of any team...</h2> : (
                            <div>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th className="hide-sm">Name</th>
                                        <th className="hide-sm">Code</th>
                                        <th />
                                    </tr>
                                    </thead>
                                    <tbody>{AdminTeamsDisplay}</tbody>
                                </table>
                            </div>
                        )
                    }
                </Fragment>
            )}
        </div>
    )
}

MyTeams.propTypes = {
    getAdminTeams: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    deleteTeam: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {getAdminTeams, deleteTeam})(MyTeams);
