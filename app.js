//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hey there! My name is Rahul and you are now on my site which i created using Node, Express and Express js. Others ofcourse HTML, JS and css. Spoilers! You cant view source code of this website by right click becuase i disables it, hahahah! Last thing this website is in development so go to About page to see what can you do.";
const aboutContent = "hello";
const contactContent = "Check out my other projects ";

const app = express();
let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function(req, res) {

  res.render("about", {
    about: aboutContent
  });
});

app.get("/contact", function(req, res) {

  res.render("contact", {
    contact: contactContent
  });
});

app.get("/compose", function(req, res) {

  res.render("compose");
});

app.post("/compose" ,function(req, res) {

  const post = {
    title: req.body.newTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");

});

app.get("/posts/:postName", function(req, res) {
  const requestedTitle =  _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
    const storedFile = _.lowerCase(post.title);

    if (storedFile === requestedTitle) {
      res.render("post", {
        title:post.title,
        content:post.content
      })
       res.redirect("/");
    }
  })
});



app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
