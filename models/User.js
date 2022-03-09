const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const userSchema = new Schema({

    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    NIC: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})
const User = mongoose.model("User", userSchema);
module.exports = User;