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
    code: {
        type: String,
        default: ""
    }, 
    isAdmin: {
        type: Boolean, 
        default: false
    }
})

module.exports = User = mongoose.model("user", UserSchema);
