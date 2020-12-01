// Project: BookSwap - CS 361 Software Engineering I
// Team Name: Not Very Agile
// Contributors: Rohit Chaudhary, Brian Forsyth, Dan Allen, Emily McMullan, Will Coiner
// Description: Node.js server utilizing the Handlebars templating engine in order to handle front end requests from the BookSwap client and also send requests to database and external API


var express = require('express');
var request = require('request');
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
    // passwords did not match
    var context = {};
    res.status(200);
    console.log(context);
    res.sendFile(path.join(__dirname + '/public/logfail.html'));
});

app.get("/editprofile", function (req, res) {
    // edit user account information 
    var context = {};
    res.status(200);
    console.log(context);
    res.sendFile(path.join(__dirname + '/public/editprofile.html'));
});

app.get("/account", function (req, res) {
    // view user account information
    res.status(200);
    res.sendFile(path.join(__dirname + '/public/account.html'))
});

app.get("/accountpull", function (req, res, next) {
    // view user account information
    mysql.pool.query("SELECT * FROM Users;", function(err, rows, fields){
        if (err){
            next(err);
            return;
        }
    res.send(rows)
    });
});

app.get("/faq", function (req, res) {
    // view FAQ page
    var userInfo = req.body
    res.status(200);
    res.sendFile(path.join(__dirname + '/public/faq.html'))
});

app.get("/myshelf", function (req, res) {
    // user's books they have added to swap
    var context = {};
    res.status(200);
    console.log(context);
    res.sendFile(path.join(__dirname + '/public/myshelf.html'));
});

app.get("/bookshelf", function (req, res) {
    // user's books they have added to swap
    var context = {};
    res.status(200);
    console.log(context);
    res.sendFile(path.join(__dirname + '/public/bookshelf.html'));
});

app.get("/bookshelfpull", function(req, res ,next){
    // displays all available books 
    var context = {};
    mysql.pool.query("SELECT * FROM Books", function(err, rows, fields){
        if(err){
            next(err);
            return;
        }
        context= rows;
        res.send(context);
    });
});

app.post("/mybookshelfpull", function(req, res ,next){
    // displays all available books 
    var context = {}
    mysql.pool.query("SELECT * FROM Books WHERE book_owner=?",
    [req.body['user']],
    function(err, rows, fields){
        if(err){
            next(err);
            return;
        }
        context= rows;
        res.send(context);
    });
});

app.post("/swaprequestpull", function(req, res, next){
    var context = {};
    mysql.pool.query('SELECT * FROM Swaps WHERE owning_user=(SELECT userid FROM Users WHERE username=?)\
    AND swap_status=1',
    [req.body['user']],
    function(err, rows, fields){
        if(err){
            next(err);
            return;
        }
        context= rows;
        res.send(context);
    });
});

app.post("/bookupdate", function (req, res) {
    // update specific book in bookshelf
    console.log(req.body);
    res.status(200);
    mysql.pool.query('UPDATE books SET title=?, author=?, book_condition=?, point_value=? WHERE bookid=?',
    [req.body.title, req.body.author, req.body.condition, req.body.points, req.body.id],
    function(err, result){
        if(err){
            console.log(err)
            next(err)
            return;
        } else {
        console.log(result);
        console.log(req.body);
        res.send(true);
        }
    });
});

app.post("/bookdelete", function (req, res) {
    // delete specific book in bookshelf
    console.log("delete")
    console.log(req.body);
    res.status(200);
    mysql.pool.query('DELETE FROM books WHERE bookid=?', req.body.bookid, function(err, result){
        if(err){
            console.log(err)
            next(err)
            return;
        } else {
        console.log(result);
        console.log(req.body);
        res.send(true);
        }
    });
});

app.get("/search", function (req, res) {
    // search for a specific book
    var context = {};
    res.status(200);
    console.log(context);
    res.sendFile(path.join(__dirname + '/public/searchbooks.html'));
});

app.get("/addbook", function (req, res) {
    // view page to add book to database
    var context = {};
    res.status(200);
    console.log(context);
    res.sendFile(path.join(__dirname + '/public/addbook.html'));
});

app.post("/signup", function (req, res) {
    var context = {}
    mysql.pool.query("SELECT * FROM Users WHERE username=?", [req.body.user], function(err, result){
        if(err){
          next(err);
          return;
        }
        if(result.length == 0){
          mysql.pool.query("INSERT INTO Users (`username`, `first_name`, `last_name`, `email`, `address`, `password`) VALUES (?,?,?,?,?,?)",
            [req.body.user, req.body.first_name, req.body.last_name, req.body.email, req.body.address, req.body.pass],
            function(err, result){
            if(err){
            console.log(err)
              next(err);
              return;
            }
            console.log(result)
            context.results = "Inserted " + result.affectedRows + " row.";
            console.log(context.results);
            res.send(true);
          });
        }
        else {
            res.send(false);
        }
      });
});

app.post("/addbook", function (req, res) {
    // adds user book to bookshelf
    mysql.pool.query("INSERT INTO Books (`title`, `author`, `book_condition`, `book_owner`, `point_value`) VALUES (?,?,?,?,?)",
    [req.body.title, req.body.author, req.body.book_condition, req.body.book_owner, Number(req.body.point_value)],
    function(err, result){
        if(err){
            console.log(err)
            next(err)
            return;
        } else {
        console.log(result)
        console.log(req.body)
        }
    }, mysql.pool.query("UPDATE Users SET points=? WHERE username=?",
    [Math.floor(Number(req.body.point_value) / 3), req.body.book_owner],
    function(err, result){
        if(err){
            console.log(err)
            next(err)
            return;
        } else {
        console.log(result)
        console.log(req.body)
        res.send(true);
        }
    })
    );
});

app.post("/addswap", function (req, res) {
    // Initiates a new swap
    mysql.pool.query("INSERT INTO Swaps(request_user, owning_user, book, swap_status) VALUES (\
        (SELECT userid FROM Users WHERE username=?),\
        (SELECT userid FROM Users WHERE username=?),\
        (SELECT bookid FROM Books WHERE title=?),\
        1)",
    [req.body.reqUser, req.body.owner, req.body.bookTitle],
    function(err, result){
        if(err){
            console.log(err)
            next(err)
            return;
        } else {
        console.log(result)
        console.log(req.body)
        res.send(true);
        }
    });
});

app.post("/ownerswaps", function (req, res) {
    // Queries database to get owning user swaps
    var context = {}
    mysql.pool.query("SELECT title, author, book_condition\
    FROM Books b\
    INNER JOIN (SELECT book\
        FROM Swaps\
        WHERE owning_user = (SELECT userid FROM Users WHERE username = ? AND\
        swap_status = 1)) AS us\
        WHERE us.book = b.bookid;",
    [req.body.reqUser],
    function(err, rows, fields){
        if(err){
            console.log(err)
            next(err)
            return;
        } else {
        context = rows;
        console.log(rows)
        res.send(context);
        }
    });
});

app.post("/acceptswap", function (req, res) {
    // book owner accepts swap
    mysql.pool.query("UPDATE Swaps SET swap_status=? WHERE owning_user=(SELECT userid FROM Users WHERE username=?)\
        AND bookid=(SELECT bookid FROM Books WHERE title=?)",
    [req.body.status, req.body.owner, req.body.bookTitle],
    function(err, result){
        if(err){
            console.log(err)
            next(err)
            return;
        } else {
        console.log(result)
        console.log(req.body)
        }
    }, mysql.pool.query("UPDATE Books SET book_owner=(SELECT request_user FROM Swaps WHERE\
        owning_user=(SELECT userid FROM Users WHERE username=?)\
        AND bookid=(SELECT bookid FROM Books WHERE title=?))"),
    [req.body.owner],
    function(err, result){
        if(err){
            console.log(err)
            next(err)
            return;
        } else {
        console.log(result)
        res.send(true);
        }
    });
});

app.post("/rejectswap", function (req, res) {
    // book owner rejects swap
    mysql.pool.query("DELETE FROM Swaps WHERE owner_user=(SELECT userid FROM Users WHERE username=?)\
    AND bookid=(SELECT bookid FROM Books WHERE title=?)"),
    [req.body.status, req.body.owner, req.body.bookTitle],
    function(err, result){
        if(err){
            console.log(err)
            next(err)
            return;
        } else {
        console.log(result)
        res.send(true);
        }
    }
})


app.post("/myshelf", function (req, res) {
    // validateCreds and send appropriate page
    var context = {}
    mysql.pool.query("SELECT password FROM Users WHERE username=?", [req.body.user], function(err, result){
        if(err){
          next(err);
          return;
        }
        var password = JSON.parse(JSON.stringify(result))[0];
        console.log(password)
        if (typeof password === 'undefined') {
            res.send(false)
            return
        }
        if(password.password == req.body.pass){
            res.send(true);
        }
        else {
            res.send(false);
        }
      });
});

app.post("/editprofile", function (req, res) {
    var context = {}
    var userInfo = req.body;
    mysql.pool.query("UPDATE Users SET first_name=?, last_name=?, email=?, address=? WHERE username=?",
        [userInfo.first_name, userInfo.last_name, userInfo.email, userInfo.address, userInfo.user],
        function(err, result){
        if(err){
          console.log(err)
        }
        console.log(result)
        context.results = "Updated " + result.affectedRows + " rows.";
        console.log(context.results)
        }
    );
})

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
            "password VARCHAR(255)," +
            "points INT)";
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
            "book_owner VARCHAR(255)," +
            "point_value INT)";
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
            "swap_status ENUM ('requested', 'accepted', 'rejected', 'sent', 'complete')," +
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
