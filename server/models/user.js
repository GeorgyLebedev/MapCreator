const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=Schema.ObjectId
const User = new Schema({
    id: ObjectId,
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    role:{
        type: "String",
        default: 'user'
    },
    avatar: {
        type: String,
        default: 'defaultAvatar.png'
    },
    regDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('User', User);
