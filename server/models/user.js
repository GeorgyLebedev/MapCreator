const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=Schema.ObjectId
const User = new Schema({
    id: ObjectId,
    email: {
        type:String,
        required: true
    },
    login:{
        type: String,
        default: ""
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
User.pre('save', function(next) {
    if (!this.login) {
        this.login = this.email;
    }
    next();
});

module.exports = mongoose.model('User', User);
