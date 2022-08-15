const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    phoneNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    houseNo:{
        type: String
    },
    area:{
        type: String
    },
    city:{
        type: String
    },
    pincode:{
        type: String
    }
});


const User = mongoose.model('User', UserSchema);
module.exports = User;