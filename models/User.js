const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    email: {
        type: String,
        required: true, 
        unique: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    avatar: {
        type: String 
    },
    date: {
        type: Date, 
        default: Date.now()
    }, 
    teams: [
        {
            code: {
                type: String
            }, 
            isAdmin: {
                type: Boolean
            }
        }
    ], 
    code: {
        type: String, 
        default: ""
    }
})

module.exports = User = mongoose.model("user", UserSchema);
