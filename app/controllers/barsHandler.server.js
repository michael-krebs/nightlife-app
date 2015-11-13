'use strict';

var Bars = require('../models/bars.js');
var Users = require('../models/users.js');

function BarHandler () {
    
    this.getInitialUsers = function (req, res) {
        
        Bars
            .findOne({ 'barId': req.params.barid})
            .exec(function (err, result){
                if (err) { throw err; }
                
                if (result) {
                    res.json(result.usersGoing.length);
                } else {
                    res.send(0);
                }
            })
    }
    
    this.goingBtnClicked = function (req, res) {
        
        var voted = false;
        
        // check whether bar exists in db
        Bars
            .findOne({ 'barId': req.params.barid })
            .exec(function (err, result) {
                if (err) { throw err; }
                
                if (result) {
                    
                    result.usersGoing.forEach(function(userId, index) {
                        if (userId === req.user.twitter.id) {
                            // remove from usersGoing list
                            result.usersGoing.splice(index, 1);
                            voted = true;
                            Bars
                                .update({ 'barId': req.params.barid }, result)
                                .exec(function(err){
                                    if (err) { throw err; }
                                    res.send();
                                })
                        }
                    })
                    
                    if (!voted) {
                        // add to usersgoing list
                        result.usersGoing.push(req.user.twitter.id);
                        Bars
                            .update({ 'barId': req.params.barid }, result)
                            .exec(function(err){
                                if (err) { throw err; }
                                res.send();
                            })
                    }
                    
                } else {
                    var newBar = new Bars({ 'barId': req.params.barid,
                        "usersGoing": [ req.user.twitter.id ]});
                    newBar.save(function(err, document) {
                        if (err) { throw err; }
                        res.json(document.usersGoing.length)
                    });
                }
            });
    }
}

module.exports = BarHandler;