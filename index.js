const express = require("express");
const app = express();
const path = require("path"); //path module in ejs
const redditData = require("./data.json"); // demo data(Hard coded data)

app.use(express.static(path.join(__dirname, "public")));

//set view engine or templating engine to ejs
app.set("view engine", "ejs");

//set the location of view folder from where ejs should search, to the directory name where index.js is /views folder.
app.set("views", path.join(__dirname, "/views")); //this helps ejs to find the views folder when we run the server- index.js from anywhere outside of the project folder
//path of the index.js folder --> __dirname

app.get("/", (req, res) => {
  res.render("home"); //renders the ejs file and return HTML code/template.
}); //also instead of "home" we could write "views/home.ejs" but we dont as ejs assumes that its in the views folder(if we haven't changed the name from views to something else) and is .ejs file

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if (data) {
    res.render("subreddit", { ...data });
  } else {
    res.render("notFound", { subreddit });
  }
});

app.get("/rand", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render("random", { num });
});

app.get("/cats", (req, res) => {
  const cats = [
    "Daisy",
    "Milo",
    "Willow",
    "Luna",
    "Molly",
    "Cleo",
    "Max",
    "Simba",
    "Kitty",
  ];
  res.render("cats", { cats });
});

app.listen(3000, () => {
  console.log("Listening to port: 3000");
});
