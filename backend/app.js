const express = require('express');

const app = express();

// app.use((req, res, next) => {
//     console.log('This is my first middleware');
//     next();
// })

app.use('/api/posts', (req, res, next) => {
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

