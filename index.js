const express = require("express");
const app = express();
const port = 3000;

const posts = require("./data/posts");
const userRoutes = require('./routes/userRoutes.js');

app.use('/api/users', userRoutes)

//Listen
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

//Get
// app.get('/',(req,res) => {
//     res.send('Work in progress');
// });

//404
app.use((req,res) => {
    res.status(404);
    res.json({error: 'Resource not found'});
})

//posts
app.get('/api/posts',(req,res) => {
    res.json(posts);
});

app.get('/api/posts/:id', (req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);
    if(post) 
        res.json(post);
    else
        next();
});


/*---------------*/

const fs = require('fs');

//Getters
app.get("/", (req, res) => {
  const options = {
    title: "Rendering Views with Express",
    content:
      "Here, we've created a basic template engine using <code>app.engine()</code> \
      and the <code>fs</code> module, then used <code>res.render</code> to \
      render this page using custom content within the template.<br><br> \
      Generally, you won't want to create your own view engines, \
      but it important to understand how they work behind the scenes. \
      For a look at some popular view engines, check out the documentation for \
      <a href='https://pugjs.org/api/getting-started.html'>Pug</a>, \
      <a href='https://www.npmjs.com/package/mustache'>Mustache</a>, or \
      <a href='https://www.npmjs.com/package/ejs'>EJS</a>. \
      More complete front-end libraries like React, Angular, and Vue \
      also have Express integrations.",
  };
  
  res.render("index", options);
});

app.get("/user", (req, res) => {
  res.send(`Received a GET request for user!
Try navigating to /user/somevalue/profile/somevalue.`);
});

app.get("/user/:userID", (req, res) => {
  res.send(`Navigated to the user page for: ${req.params.userID}.`);
});

app.get("/user/:userID/profile", (req, res) => {
  res.send(`Navigated to the user profile page for: ${req.params.userID}.`);
});

app.get("/user/:userID/profile/:data", (req, res) => {
  res.send(
    `Navigated to the user profile page for: ${req.params.userID}, with the data: ${req.params.data}.`
  );
});

//Route
app .route('/learner')
    .get((req, res) => {
        res.send("Get a random learner.");
    })
    .post((req,res) => {
        res.send("Add a learner.");
    })
    .put((req,res) => {
        res.send("Update the leanrer's information.")
});

//Request
const logReq = function (req, res, next) {
    console.log("Request Received");
    next();
};

//Template
app.engine("perscholas", (filePath, options, callback) => { // define the template engine
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);

    // Here, we take the content of the template file,
    // convert it to a string, and replace sections of
    // it with the values being passed to the engine.
    const rendered = content
      .toString()
      .replaceAll("#title#", `${options.title}`)
      .replace("#content#", `${options.content}`);
    return callback(null, rendered);
  });
});

//App
app.use(express.static("./styles")); // serve static files from the styles directory
app.use(logReq); //User opened the page
app.use((err, req, res, next) => {  // error handler
  res.status(400).send(err.message);
});

app.set("views", "./views"); // specify the views directory
app.set("view engine", "perscholas"); // register the template engine
