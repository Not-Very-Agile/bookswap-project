// Project: BookSwap - CS 361 Software Engineering I
// Team Name: Not Very Agile
// Contributors: Rohit Chaudhary, Brian Forsyth, Dan Allem, Emily McMullan, Will Coiner
// Description: Node.js server utilizing the Handlebars templating engine in order to handle front end requests from the BookSwap client and also send requests to database and external API

var credentials = require('./credentials.json')
var express = require('express');
var request = require('request');

var app = express();
var path = require('path');

app.set('port', process.env.PORT || 7500);

app.use(express.static(path.join (__dirname, 'views')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// called by myshelf route to check against credentials
function validateCreds(creds) {
    for (let i=0; i < credentials.accounts.length; i++) {
        if (creds['user'] == credentials.accounts[i]["user"]) {
            if (creds['pass'] == credentials.accounts[i]["pass"]) {
                return true;
            }
            return false;
        }
    }
    return false;
}

app.get("/", function(req, res){
    // home page
    var context = {};
    res.status(200);
    console.log(context);
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get("/signup", function(req, res) {
    // new user create credentials
    var context = {};
    res.status(200);
    console.log(context);
    res.sendFile(path.join(__dirname + '/views/signup.html'));
});

app.get("/login", function(req, res){
    // already existing user login page
    var context = {};
    res.status(200);
    console.log(context);
    res.sendFile(path.join(__dirname + '/views/login.html'));
});

app.post("/myshelf", function(req, res) {
    // validateCreds and send appropriate page
    creds = {'user': req.body.user, 'pass': req.body.pass}
    if (validateCreds(creds) == true) {
        res.status(200);
        res.sendFile(path.join(__dirname + '/views/myshelf.html'));
    } else {
        res.status(200);
        res.sendFile(path.join(__dirname + '/views/logfail.html'));
    }
});

app.get("/about", function(req, res){
    // about page
    var context = {};
    res.status(200);
    console.log(context);
    res.sendFile(path.join(__dirname + '/views/about.html'));
});

app.get(function(req,res){
    res.status(404);
    res.render('404');
});
    
app.get(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log(`Express started on http://${process.env.HOSTNAME}:${app.get('port')}; press Ctrl-C to terminate.`);
});