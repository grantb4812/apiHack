$(document).ready(function(){
	
	$('#artist-form').submit(function(artist){
		artist = $('.artist').val();

		searchArtist(artist);
		tourDates(artist);
		
		
		return false;
	});

	

});

var artist;

// need to send GET request to spotify API
var searchArtist = function(artist) {
// parameters for searching for artist to get id 
		var param = {
				q: artist,
				type: "artist",	
			}


		var artistId = $.ajax ({
			url: "https://api.spotify.com/v1/search?",
			data: param,
			dataType: "json",
			type: "GET",
			})
		.done(function(){
			var id = artistId.responseJSON.artists.items[0].id;
			artistArt(id);
			topTracks(id);
		});
		
};

//need to send GET request to bandsintown API

var artistArt = function(id) {
	
	var artist = $.ajax ({
		url: "https://api.spotify.com/v1/artists/" +id,
		dataType: "json",
		type: "GET",
	})
	.done(function(){
		var image = artist.responseJSON.images[0].url;
		console.log(artist.responseJSON.images[0].url);
		$('.cover-image').append("<img class='img' src='"+image+"' alt='cover-image'>");
	});

};

var topTracks = function(id) {
	
	var track = $.ajax({
		url: "https://api.spotify.com/v1/artists/"+id+"/top-tracks?country=us",
		dataType: "json",
		type: "GET"
	})
	.done(function(result){
		console.log(result.tracks);
		$.each(result.tracks, function(index, value){
			$('#top-song').append("<li>"+value.name+"</li>");
		})
	});

};	

var tourDates = function(artist){

	var param = {
			artist: artist,
			format: "json",
			app_id: "spotagram",
			api_version: "2.0"
	}

	var dates = $.ajax ({
		url: "http://api.bandsintown.com/artists/"+artist+"/events.json",
		data: param,
		dataType: "jsonp",
		type: "GET"
	})
	.done(function(result){
		console.log(result);
	});
};

	



