const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=Schema.ObjectId
const Map = new Schema({
    id: ObjectId,
    user: {
        type:String,
        required: true
    },
    title: {
        type:String,
        required: true
    },
    creationDate: {
        type:Date,
        required: true
    },
    changeDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    resolution: {
        type: String,
        required: true
    },
    smallPicture: {
        type: String
    },
    objects: {
        type:{},
        required:true
    }
});

module.exports = mongoose.model('Map', Map);
