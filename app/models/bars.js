'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bar = new Schema({
    barId: { type: String, unique: true }, // bar ID given by yelp
    usersGoing: [ Number ] // list of twitter IDs of users going
});

module.exports = mongoose.model('Bar', Bar);