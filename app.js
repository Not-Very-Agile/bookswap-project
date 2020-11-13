// Project: BookSwap - CS 361 Software Engineering I
// Team Name: Not Very Agile
// Contributors: Rohit Chaudhary, Brian Forsyth, Dan Allem, Emily McMullan, Will Coiner
// Description: Node.js server utilizing the Handlebars templating engine in order to handle front end requests from the BookSwap client and also send requests to database and external API

var credentials = require('./credentials.json')
var express = require('express');
var request = require('request');
const fs = require("fs");
var mysql = require('./dbcon.js');
require('dotenv').config();
var app = express();
var path = require('path');

app.set('port', process.env.PORT || 7600);

console.log(__dirname + '/public');

app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static(path.join (__dirname, 'css')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// called by myshelf route to check against credentials
function validateCreds(creds) {
    for (let i = 0; i < credentials.accounts.length; i++) {
        if (creds['user'] == credentials.accounts[i]["user"]) {
            if (creds['pass'] == credentials.accounts[i]["pass"]) {
                return true;
            }
            return false;
        }
    }
    return false;
}

// checks for unique username
function checkUsername(username) {
    for (var i = 0; i < credentials.accounts.length; i++) {
        if (credentials.accounts[i]['user'] === username['user'])
            return true;
    }
    return false;
}

app.get("/", function (req, res) {
    // home page
    var context = {};
    res.status(200);
    console.log(context);
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get("/signup", function (req, res) {
    // new user create credentials
    var context = {};
    res.status(200);
    res.sendFile(path.join(__dirname + '/public/signup.html'))
});

app.get("/login", function (req, res) {
    // already existing user login page
    var context = {};
    res.status(200);
    console.log(context);
    res.sendFile(path.join(__dirname + '/public/login.html'));
});

app.get("/logfail", function (req, res) {
    // already existing user login page
    var context = {};
    res.status(200);
    console.log(context);
    res.sendFile(path.join(__dirname + '/public/logfail.html'));
});

app.get("/editprofile", function (req, res) {
    // already existing user login page
    var context = {};
    res.status(200);
    console.log(context);
    res.sendFile(path.join(__dirname + '/public/editprofile.html'));
});

app.get("/account", function (req, res) {
    // view user account information
    var userInfo = req.body
    res.status(200);
    res.sendFile(path.join(__dirname + '/public/account.html'))
});


app.post("/signup", function (req, res) {
    var userInfo = req.body;
    var taken = checkUsername(userInfo);
    if (taken === true) {
        res.send(false)
    }
    else {
        credentials.accounts.push(userInfo);
        fs.writeFile("credentials.json", JSON.stringify(credentials), err => {
            // Checking for errors 
            if (err) throw err;
            console.log("Done writing"); // Success 
        });
        res.send(true);
    }
})

app.post("/myshelf", function (req, res) {
    // validateCreds and send appropriate page
    creds = { 'user': req.body.user, 'pass': req.body.pass }
    if (validateCreds(creds) == true) {
        res.status(200);
        res.send(true)
    } else {
        res.status(200);
        res.send(false)
    }
});

app.post("/editprofile", function (req, res) {
    var userInfo = req.body;
    var index = null
    for (var i = 0; i < credentials.accounts.length; i++) {
        if (credentials.accounts[i]['user'] === userInfo['user'])
            index = i;
    }
    credentials.accounts[index]['first_name'] = userInfo['first_name'];
    credentials.accounts[index]['last_name'] = userInfo['last_name'];
    credentials.accounts[index]['email'] = userInfo['email'];
    credentials.accounts[index]['address'] = userInfo['address'];
});

app.get("/about", function (req, res) {
    // about page
    var context = {};
    res.status(200);
    console.log(context);
    res.sendFile(path.join(__dirname + '/public/about.html'));
});

app.get(function (req, res) {
    res.status(404);
    res.render('404');
});

app.get(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

// Table Creation *** CAUTION: Will RESET ALL TABLES AND RECREATE ***
app.get('/reset-users', function (req, res, next) {
    var context = {};
    mysql.pool.query("DROP TABLE IF EXISTS Users", function (err) { //replace your connection pool with the your variable containing the connection pool
        var createString = "CREATE TABLE Users(" +
            "userid INT PRIMARY KEY AUTO_INCREMENT," +
            "username VARCHAR(255) NOT NULL," +
            "first_name VARCHAR(255)," +
            "last_name VARCHAR(255)," +
            "email VARCHAR(255)," +
            "address VARCHAR(255)," +
            "password VARCHAR(255))";
        mysql.pool.query(createString, function (err) {
            context.results = "Users Table reset";
            console.log(err);
            res.send(context.results);
        })
    })
});

app.get('/reset-books', function (req, res, next) {
    var context = {};
    mysql.pool.query("DROP TABLE IF EXISTS Books", function (err) { //replace your connection pool with the your variable containing the connection pool
        var createString = "CREATE TABLE Books(" +
            "bookid INT PRIMARY KEY AUTO_INCREMENT," +
            "title VARCHAR(255) NOT NULL," +
            "author VARCHAR(255)," +
            "book_condition VARCHAR(255)," +
            "book_owner INT," +
            "FOREIGN KEY (book_owner) REFERENCES Users(userid))";
        mysql.pool.query(createString, function (err) {
            context.results = "Books Table reset";
            console.log(err);
            res.send(context.results)
        })
    })
});

app.get('/reset-swaps', function (req, res, next) {
    var context = {};
    mysql.pool.query("DROP TABLE IF EXISTS Swaps", function (err) { //replace your connection pool with the your variable containing the connection pool
        var createString = "CREATE TABLE Swaps(" +
            "swapid INT PRIMARY KEY AUTO_INCREMENT," +
            "request_user INT," +
            "owning_user INT," +
            "book INT," +
            "FOREIGN KEY (request_user) REFERENCES Users(userid)," +
            "FOREIGN KEY (owning_user) REFERENCES Users(userid)," +
            "FOREIGN KEY (book) REFERENCES Books(bookid))";
        mysql.pool.query(createString, function (err) {
            context.results = "Swaps Table reset";
            console.log(err);
            res.send(context.results);
        })
    })
});


app.listen(app.get('port'), function () {
    console.log(`Express started on http://${process.env.HOSTNAME}:${app.get('port')}; press Ctrl-C to terminate.`);
});
