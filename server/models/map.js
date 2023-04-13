const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=Schema.ObjectId
const Map = new Schema({
    id: ObjectId,
    userId: Number,
    creationDate: Date,
    title: String,
    description: String,
    author: String,
    resolution: String,
});

module.exports = mongoose.model('Map', Map);
