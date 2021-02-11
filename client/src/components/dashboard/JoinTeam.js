import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {registerTeam} from '../../actions/auth'


const JoinTeam = ({registerTeam}) => {

    const[code, setCode] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        registerTeam({code});
    }

    const onChange = e => setCode(e.target.value);

    return (
        <Fragment>
            <h2 className="my-2">Enter Team Code</h2>
            <form  className="form" onSubmit={e=>onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Code" name="code" value={code} onChange={e=>onChange(e)}/>
                </div>
                <input type="submit" className="btn btn-primary my-1" value="Enter Team"/>
            </form>
        </Fragment>
    )
}

JoinTeam.propTypes = {
    registerTeam: PropTypes.func.isRequired,
}

export default connect(null, {registerTeam})(JoinTeam)
