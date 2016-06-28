/**
 * Created by Michael on 2016/6/28.
 */

//load express - look inside node_modules directory
//    express is the library name
//    ask express to creat an object for initialization
//    all documentation is install by "require", standard format, express mandate it
var express = require("express");

//create an instance of express application
var app = express ();

//star of request processing

app.use(function (req, res, next) {
    console.info("Imcoming request: %s", req.originalUrl);
    //must use 'next' so to terminate the current process and go to next
    next();
})

var expressStatic = express.static(__dirname + "/public");
console.info(">> %s", (typeof expressStatic));

//Serve static files from public directory
//a request come in, will look for "use", this is the actual process block
app.use(express.static(__dirname + "/public"));

//serve files from bower_components
app.use(express.static(__dirname + "/bower_components"));

//In express, Middleware - is a function handles request.
//req, request
//res: response
app.use(function(req, res) {
    console.info("File not found in public: %s", req.originalUrl);
    res.redirect("/error.html");
});

//set out ..
//the sequence is important, the browser will read them in order
// we can use "set APP_PORT = 3001", from environment variable
//the "port" variable is representing actual port, but we name it "port" to be clearer
app.set ("port",
     process.argv[2] || process.env.APP_PORT || 3000 || 3001);

//start server on port
//the last app.get("port"), is the actual port
app.listen(app.get("port"), function() {
    console.info ("Application started on port %d", app.get("port"));
});


