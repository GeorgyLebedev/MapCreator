const mongoose = require('mongoose'); //подключение ODM
const Schema = mongoose.Schema;
const ObjectId=Schema.ObjectId
const Map = new Schema({
    id: ObjectId, //код карты
    user: { //код пользователя
        type:String,
        required: true
    },
    title: { //название карты
        type:String,
        required: true
    },
    creationDate: { //дата создания карты
        type:Date,
        required: true
    },
    changeDate: {  //дата изменения карты
        type: Date,
        required: true
    },
    description: { //описание карты
        type: String,
        default: "",
        required: false
    },
    resolution: { //разрешение холста
        type: String,
        required: true
    },
    miniature: {//миниатюра карты (код изображения)
        type: String,
        required: false,
    },
    objects: { //объекты карты
        type:{},
        required:false
    }
});
module.exports = mongoose.model('Map', Map);
