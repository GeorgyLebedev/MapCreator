const express = require('express');
const router = express.Router();
const userModel = require('./models/user');
const objectsModel=require('./models/objects');
const optionsModel=require('./models/options');
const mapModel=require('./models/map');
const stampsModel=require('./models/objects');
const nodemailer=require('nodemailer')
let model
