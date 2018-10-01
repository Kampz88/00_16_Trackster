var Trackster = {};
const API_KEY = '1dbe5a4da1f8d9a89eba65147d30b632';

$(document).ready(function(){
  $('#search').click(function(){
    Trackster.searchTracksByTitle($('#input').val());
  });
});

  /*
    Given an array of track data, create the HTML for a Bootstrap row for each.
    Append each "row" to the container in the body to display all tracks.
  */
  Trackster.renderTracks = function(tracks){
    var $tracklist = $('#tracks');

    $tracklist.empty();

    for (var trackID = 0; trackID < tracks.length; trackID++){
      var track = tracks[trackID];
      var albumart = track.image[1]['#text'];
      var htmlTrackRow =
        '<div class="row song">' +
        ' <div class="col-xs-1 col-xs-offset-1 info"><a href="'+ track.url +'" target="_blank"><i class="fa fa-play-circle-o fa-2x"></i></a></div>' +
        ' <div class="col-xs-4 info">'+ track.name +'</div>' +
        ' <div class="col-xs-2 info">'+ track.artist +'</div>' +
        ' <div class="col-xs-2 info"><img src="'+ albumart +'"></div>' +
        ' <div class="col-xs-2 info">'+ track.listeners +'</div>' +
        '</div>';

    $tracklist.append(htmlTrackRow);}
  };

  /*
    Given a search term as a string, query the LastFM API.
    Render the tracks given in the API query response.
  */
  Trackster.searchTracksByTitle = function(title) {

    $.ajax({
      url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track='+ title +'&api_key='+ API_KEY +'&format=json',
      success: function(response){
        Trackster.renderTracks(response.results.trackmatches.track);
      }
    });
  };
