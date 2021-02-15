import React, {useState} from 'react'
import PropTypes from 'prop-types'

const CreateTeam = props => {

    const [formData, setFormData] = useState({
        description: '', 
        name: ''
    });

    const {description, name} = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div>
            <h1 className="large text-primary">
                Create a Team
            </h1>
            <form className='form my-1' onSubmit={e=>{
                e.preventDefault();
                console.log(formData);
            }}>
                <div className="form-group">
                    <input type="text" placeholder="Team Name" name="name" value={name} onChange={e=>onChange(e)} required />
                </div>
                <textarea
                    name='description'
                    cols='30'
                    rows='5'
                    placeholder='Description'
                    value={description}
                    onChange={e=>onChange(e)}
                    required
                />
                <input type='submit' className='btn btn-dark my-1' value='Submit' />
            </form>
        </div>
    )
}

CreateTeam.propTypes = {

}

export default CreateTeam
