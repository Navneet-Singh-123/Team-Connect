import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {getAdminTeams, deleteTeam, getUserTeams, loadUser} from '../../actions/auth'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner';
import {leaveTeam} from '../../actions/profile';
import {withRouter} from 'react-router-dom'

const MyTeams = ({getAdminTeams, auth: {adminTeams, loading, myTeams}, deleteTeam, getUserTeams, leaveTeam, loadUser, history}) => {

    useEffect(() => {
        getAdminTeams();
        getUserTeams();
    }, [getAdminTeams, getUserTeams])

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
    const MyTeamsDisplay = myTeams.map(team => (
        <tr key={team._id}>
            <td>{team.name}</td>
            <td>
                <button
                className="btn btn-danger"
                onClick={()=>{
                    leaveTeam(team.code, history);
                    loadUser();
                }}
                >
                Leave
                </button>
          </td>
        </tr>
      ));

    return (
        <div>
            {loading ? <Spinner /> : (
                <Fragment>
                    <h1 className="large text-primary">Admin Teams</h1>
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
                    <h1 className="large text-primary">Joined Teams</h1>
                        <Fragment>
                            {
                                myTeams.length===0 ? 
                                <h2 className="text-dark">You are not part of any team...</h2> : (
                                    <div>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th className="hide-sm">Name</th>
                                                <th />
                                            </tr>
                                            </thead>
                                            <tbody>{MyTeamsDisplay}</tbody>
                                        </table>
                                    </div>
                                )
                            }
                        </Fragment>
                </Fragment>
            )}
            
            
        </div>
    )
}

MyTeams.propTypes = {
    getAdminTeams: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    deleteTeam: PropTypes.func.isRequired,
    getUserTeams: PropTypes.func.isRequired,
    leaveTeam: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {getAdminTeams, deleteTeam, getUserTeams, leaveTeam, loadUser})(withRouter(MyTeams));
