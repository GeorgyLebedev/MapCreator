const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=Schema.ObjectId
const User = new Schema({
    id: ObjectId,
    email: String,
    password: String,
    avatar: String,
    regDate: Date
});

module.exports = mongoose.model('User', User);
