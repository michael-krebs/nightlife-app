'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bar = new Schema({
    yelp: {
        name: String,
        description: String,
        rating: Number,
        imgUrl: String,
        yelpUrl: String
    },
    usersGoing: [ Number ]
});

module.exports = mongoose.model('Bar', Bar);