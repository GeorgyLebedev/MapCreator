const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=Schema.ObjectId
const Objects = new Schema({
    id: ObjectId,
    mapId: Number,
    jsonData: JSON
});

module.exports = mongoose.model('Objects', Objects);
