const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post')

mongoose.connect('mongodb+srv://jemmongo:VuvTldACNAbtTUxa@cluster0.kx8s8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
).then(() => {
    console.log('Connected to database!');
}).catch(() => {
    console.log('Connection failed!');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
})

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    console.log(post);
    res.status(201).json({
        message: 'Post added succesfully'
    });
});

app.get('/api/posts', (req, res, next) => {
    const posts = 
        [
        { 
            id: "eoiyaruia",
            title: "first title from server-side",
            content: "first content from server-side"
        },
        {
            id: "sdfsfsdj",
            title: "second title from server-side",
            content: "second content from server-side"
        }, 

        ];

    res.status(200).json({
        message: 'Posts succesfully fetched!',
        posts: posts
    });
});

module.exports = app;

