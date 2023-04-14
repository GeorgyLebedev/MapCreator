const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=Schema.ObjectId
const Options = new Schema({
    id: ObjectId,
    userId: Number,
    palette: JSON,

});

module.exports = mongoose.model('Options', Options);
