const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=Schema.ObjectId
const Map = new Schema({
    id: ObjectId,
    userId: String,
    creationDate: Date,
    changeDate: Date,
    title: String,
    description: String,
    author: String,
    resolution: String,
    smallPicture: String
});

module.exports = mongoose.model('Map', Map);
