import React, { Fragment, useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {setAlert} from '../../actions/alert'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'


const ShowTeams = ({teams, setAlert}) => {

    const [team, setTeam] = useState(""); 
    const [code, setCode] = useState("");


    const onChange = e => {
        setTeam(e.target.value);
    }

    const onSubmit = e => {
        e.preventDefault();
        if(team === "0" || team===""){
            setAlert("Please enter a valid Team or join a team")
        }
        else{
            const curTeam = teams.filter(item=>{
                return item.name === team
            })
            setCode(curTeam[0].code);
            console.log(team, code);
        }
    }

    return (
        <Fragment>  
            <h2 className="my-2">Select a Team to join</h2>
            <form  className="form" onSubmit={e=>onSubmit(e)}>
                <div className="form-group">
                    <select name="team" value={team} onChange={e=>onChange(e)}>
                        <option value="0" key="0">Select a Team</option>
                        {   
                            teams.map(t => (
                                <option value={t.name} key={t._id}>{t.name}</option>
                            ))
                        }
                    </select>
                </div>
                <input type="submit" className="btn btn-primary my-1" value="Join"/>
            </form>
        </Fragment>
    )
}

ShowTeams.propTypes = {
    setAlert: PropTypes.func.isRequired,
}

export default connect(null, {setAlert})(ShowTeams);