const express = require('express')
const morgan = require('morgan')
const playlist = require('./playstore-data.js')

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {

    //set genre and sort as queries
    const { genre = " ", sort } = req.query;
    
    //create new variable for the results created by filtering the playlist by genre
    let results = playlist.filter(playlist => 
        playlist
            .Genres
            .toLowerCase()
            .includes(genre.toLowerCase())
    );

    //sort results    
    if (sort) {
        results.sort((a, b) =>{
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        })
    }

    //return the results as a json object
    res.json(results)

});

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});