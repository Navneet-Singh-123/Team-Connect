const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    description: {
        type: String, 
        required: true
    },
    code: {
        type: String,
        required: true
    }, 
    members: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ]
})

module.exports = mongoose.model('team', TeamSchema);