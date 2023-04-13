const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.set('port', 1111)
mongoose.connect('mongodb://127.0.0.1:27017/test' )
    .then(()=> console.log('[OK] DB is connected'))
    .catch(err => console.error(err));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/records', require("router"));
app.use('/', express.static(path.join(__dirname, '../dist')));
