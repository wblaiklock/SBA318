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
app.get('/',(req,res) => {
    res.send('Work in progress');
});

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
