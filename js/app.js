$(document).ready(function(){
	
	$('#artist-form').submit(function(artist){
		artist = $('.artist').val();

		searchArtist(artist);
		tourDates(artist);
		
		
		return false;
	});

	$('#come-in').on('click', function(){

		$('.intro-hide').hide();
		$('.hidden').show();
		


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
			relatedArtist(id);
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
		console.log(result)
		$.each(result, function(index, value){
			
			$("#city-dates").append("<li>"+value.formatted_location+"</li>");
		})
	});
};

var relatedArtist = function(id) {

	var similarArtist = $.ajax({
		url: "https://api.spotify.com/v1/artists/"+id+"/related-artists",
		dataType: "json",
		type: "GET"
	})
	.done(function(result) {
		console.log(result);

		$.each(result.artists, function(index, value) {
			console.log(result.artists.length);

			if (index < 5) {
			$("#different-artist").append("<li><img class='small-img' src='"+value.images[0].url+"'>"+value.name+"</li>");
			}
			if (index > 5 && index < 11) {
				$("#different-artist").append("<li><img class='small-img' src='"+value.images[0].url+"'>"+value.name+"</li>");
			}

		})
	})
}

/*
var showSearch = function() {
	var search = $('#artist-form').clone();
	$('.intro-section').append(search);
}
*/
/*
var showImage = function(image) {

	var pic = $('.cover-image').clone();

	

	
}
*/

