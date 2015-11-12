'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bar = new Schema({
    barId: String, // bar ID given by yelp
    usersGoing: [ Number ] // list of IDs of users going
});

module.exports = mongoose.model('Bar', Bar);