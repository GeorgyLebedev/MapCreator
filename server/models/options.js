const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=Schema.ObjectId
const Options = new Schema({
    id: ObjectId,
    user:  {
        type:String,
        required: true
    },
    palette: {},
    stamps:{}
});

module.exports = mongoose.model('Options', Options);
