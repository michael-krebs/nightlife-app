'use strict';

var Bars = require('../models/bars.js');
var Users = require('../models/users.js');

function BarHandler () {
    
    this.goingBtnClicked = function (req, res) {
        // check whether bar exists in db
        Bars //TODO Send bar ID via api req 
            .findOne({ 'barId': req.params.barid })
            .exec(function (err, result) {
                if (err) { throw err; }
                
                // if no, add it to the db w/ user click
                if (result === null) {
                    Bars.insert({ 'barId': req.params.barid,
                        "usersGoing": [ req.user.twitter.id ]});
                }
                res.json(result.usersGoing.length);
            })
        
        
            // if no, add user to usersGoing and increment number.
            // if yes, remove user from usersGoing and decrement number.
    
    }
}

module.exports = BarHandler;