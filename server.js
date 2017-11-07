// Include Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// Require Article schema
const Article = require("./models/Article");

// Create instance of express
const app = express();


// Run morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Serves static content from public directory
app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB config
mongoose.connect(" ");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Route gets saved articles
app.get("/api/saved", function(req, res) {

  // Find all the records and limit of 10
  Article.find({}).limit(10).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// Redirects to rendered react app
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Route to save articles 
app.post("/api/saved", function(req, res) {
  console.log("Article title: " + req.body.title);
  console.log("Article date: " + req.body.date);
  console.log("Article url: ") + req.body.url;

  // Save article
  Article.create({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Article");
    }
  });
});

// Delete saved article
app.delete("/api/saved/:id", function(req, res) {

  console.log("Article ID to delete: " + req.params.id);

  Article.findByIdAndRemove(req.params.id, function (err, response) {
    if(err){
      res.send("Delete didn't work: " + err);
    }
    res.send(response);
  });
});


// Set initial port and listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});