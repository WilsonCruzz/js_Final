const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
    type:{
        type: String,
    },
    description:{
        type: String,
    },
    income:{
        type: String,
        required:true
    },
    expense:{
        type: String,
        required:true
    },
    balance:{
        type: String,
        required:true
    },
    note:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);