require("dotenv").config();
var log = require('console-emoji')
var keys = require("./keys.js");

var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');



//Twitter==============================================================//
var recentTweets = function () {

    var client = new Twitter(keys.twitter);

    var params = {
        screen_name: 'abelgr8'
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {
                console.log("tweeted by: @" + tweets[i].user.screen_name + "\n" + tweets[i].text + "\n" + tweets[i].created_at);
                log("-------------------------------------", "blue");
            }
        }
    });

}


// Spotify============================================================//

var artistName = function (artist) {
    return artist.name;
}

var getSpotify = function (songName) {
    var spotify = new Spotify(keys.spotify);

    var songName = process.argv[3];

    if (songName == null) {
        songName = 'The Sign by Ace of Base';
    }

    spotify.search({
        type: 'track',
        query: songName,
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // console.log(data.tracks.items[0]);
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("Artist(s): " + songs[i].artists.map(artistName) + "\nSong name: " + songs[i].name + "\nAlbum: " + songs[i].album.name + "\nPreview song: " + songs[i].preview_url);
            console.log("================================================")
        }
    });
}

// Request============================================================//

var movReq = function (movieName) {
    var movieName = process.argv[3];

    if (movieName == null) {
        movieName = 'Mr. Nobody';
    }

    request("http://www.omdbapi.com/?t=" + movieName + "&apikey=" + keys.omdb, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var movieData = JSON.parse(body);

            console.log('Title:' + movieData.Title + "\nYear: " + movieData.Year + "\nRated: " + movieData.Rated + "\nIMDB Rating: " + movieData.imdbRating + "\nRotten Tomatoes Rating: " + movieData.Ratings[1].Value + "\nCountry: " + movieData.Country + "\nLanguage: " + movieData.Language + "\nPlot: " + movieData.Plot + "\nActors: " + movieData.Actors + "\nWebsite: " + movieData.Website);
        }
    })
}

//File system===============================================//

var randomFile = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        }else if (dataArr.length == 1 ) {
            pick(dataArr[0]);
        }
    })
};


///searches

var pick = function (caseData, functionData) {
    
    switch (caseData) {
        case "my-tweets":
            recentTweets();
            break;
        case "spotify-this-song":
            getSpotify(functionData);
            break;
        case "movie-this":
            movReq(functionData);
            break;
        case "do-what-it-says":
            randomFile();
            break;
        default:
            log('⚆ _ ⚆ LIRI does not compute', 'red');
    }
}

var run = function (cmd1, cmd2) {
    pick(cmd1, cmd2);
};

run(process.argv[2], process.argv[3]);