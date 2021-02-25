import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {editTeamDetails, getCurrentTeamById} from '../../actions/auth'

const EditDetails = ({history, editTeamDetails, match, getCurrentTeamById, auth: {currentTeam, loading}}) => {

    const [formData, setFormData] = useState({
        description: '', 
        name: ''
    });


    const {description, name} = formData;

    useEffect(()=>{
        getCurrentTeamById(match.params.id);
        setFormData({
            description: loading || !currentTeam.description ? '' : currentTeam.description, 
            name: loading || !currentTeam.name ? '' : currentTeam.name
        })
    }, [getCurrentTeamById, loading])


    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div>
            <h1 className="large text-primary">
                Edit Team Details
            </h1>
            <form className='form my-1' onSubmit={(e)=>{
                e.preventDefault();
                editTeamDetails(match.params.id, formData, history);
            }}>
                <div className="form-group">
                    <input type="text" placeholder="Team Name" name="name" value={name} onChange={e=>onChange(e)}  />
                </div>
                <textarea
                    name='description'
                    cols='30'
                    rows='5'
                    placeholder='Description'
                    value={description}
                    onChange={e=>onChange(e)}
                    
                />
                <input type='submit' className='btn btn-dark my-1' value='Edit' />
            </form>
        </div>
    )
}

EditDetails.propTypes = {
    editTeamDetails: PropTypes.func.isRequired,
    getCurrentTeamById: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {editTeamDetails, getCurrentTeamById})(withRouter(EditDetails));
