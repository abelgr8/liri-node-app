require("dotenv").config();
var log = require('console-emoji')
var keys = require("./keys.js");


var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


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
            console.log("Artist(s): " + songs[i].artists.map(artistName) + "\nSong name: " + songs[i].name + "\nAlbum: " + songs[i].album.name);
            console.log("================================================")
        }
    });
}

///searches

var pick = function (caseData, functionData) {
    switch (caseData) {
        case "tweets":
            recentTweets();
            break;
        case "spotify":
            getSpotify(functionData);
            break;
        default:
            log('⚆ _ ⚆ LIRI does not compute', 'red');
    }
}

var run = function (cmd1, cmd2) {
    pick(cmd1, cmd2);
};

run(process.argv[2], process.argv[3]);