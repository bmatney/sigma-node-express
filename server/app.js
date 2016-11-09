// node/express application
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// puts post request body data and store it on req.body
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 3000);

// Our song data
var songs = [
  {
    artist: "Bruce Springsteen",
    title: "Born in the U.S.A.",
    date: "11/8/2016",
  }
];

// Routes
app.post('/songs', function(req, res) {
  // req.body is supplied by bodyParser above
  console.log("REQ body: ", req.body);
  var newSong = req.body;
  // created new resource

if (checkSong(newSong)){
  newSong.date = new Date().toLocaleDateString();
  songs.push(newSong);
  res.sendStatus(201);
  } else {
  res.sendStatus(400);
  }
});


function checkSong(song) {
  if (song.artist === '' || song.title === '') {
    console.log('Some fields are empty.');
    return false;
  } else {
    for (var i = 0; i < songs.length; i++) {
      var newSongTitle = song.title;
      var newSongArtist = song.artist;
      var titleList = songs[i].title;
      var artistList = songs[i].artist;
      if (newSongTitle === titleList && newSongArtist === artistList) {
        console.log('That song has been entered already.');
        return false;
      }
    }
  }
  return true;
}

app.get('/songs', function(req, res) {
  console.log('handling get request for songs');
  // response options
  // res.sendStatus(200);
  res.send(songs);
});

// static file routing
app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  console.log(file);

  res.sendFile(path.join(__dirname, './public/', file));
  // /public/views/index.html
});

app.listen(app.get('port'), function() {
  console.log('Server is listening on port ' + app.get('port'));
});
