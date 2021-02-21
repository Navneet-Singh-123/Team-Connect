import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {deleteAccount, getCurrentProfile, getTeamProfiles} from '../../actions/profile'
import {getUserTeams, loadUser} from '../../actions/auth'
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import ShowTeams from './ShowTeams';
import JoinTeam from './JoinTeam';

const Dashboard = ({getCurrentProfile, auth: {user, myTeams}, profile: { profile, loading }, deleteAccount, getUserTeams, getTeamProfiles, loadUser}) => {

    useEffect(() => {
        getCurrentProfile();
        getUserTeams(); 
        loadUser();
        if(user && user.code){
            getTeamProfiles(user.code);
        }
    }, [])

    return loading && profile===null ? <Spinner/> : (
        <Fragment>
            <h1 className='large text-primary'>Dashboard</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Welcome {user && user.name}
            </p>
            {profile!==null ? (
                <Fragment>
                    <DashboardActions />
                    <Experience experience={profile.experience}/>
                    <Education education={profile.education}/>
                    <ShowTeams teams={myTeams} />
                    <JoinTeam />
                    <Link to="/create-team" className="btn btn-primary my-1">Create Team</Link>
                    <div className="my-2">
                        <button className="btn btn-danger" onClick={()=>deleteAccount()}>
                            <i className="fas fa-user-minus">
                                Delete My Account
                            </i>
                        </button>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link to='/create-profile' className='btn btn-primary my-1'>
                        Create Profile
                    </Link>
                </Fragment>
            )}
        </Fragment> 
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    getUserTeams: PropTypes.func.isRequired,
    getTeamProfiles: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth, 
    profile: state.profile, 
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount, getUserTeams, getTeamProfiles, loadUser})(Dashboard)
