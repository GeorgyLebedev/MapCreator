const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=Schema.ObjectId
const Stamps = new Schema({
    stampId: ObjectId,
    userId: Number,
    img: String,
    set: String
});

module.exports = mongoose.model('Stamps', Stamps);
