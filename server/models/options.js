const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=Schema.ObjectId
const Objects = new Schema({
    id: ObjectId,
    userId: Number,
    palette: JSON,

});

module.exports = mongoose.model('Objects', Objects);
