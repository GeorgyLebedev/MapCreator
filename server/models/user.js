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
    avatar: {type: String, default: 'defaultAvatar.png'},
    regDate: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('User', User);
