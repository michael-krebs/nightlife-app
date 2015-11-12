'use strict';

$(document).ready(function(){

	
	// take search input when submitted
	$('#searchBtn').click(function() {
		var searchText = $('#search').val();
		
		// make get request to yelp controller
		$.get("/api/yelp/" + searchText, function(data) {
			var bars = JSON.parse(data).businesses;
			populate(bars);
		});
	});
	
  	$('#barList').on('click', '.goingButton', function(){
  		console.log(this.id);
  	})
	
	// take and interpret json data from yelp controller
	function populate(bars) {
		
		// clears list of bars if you search more than once
		$('#barList').empty();
		
		bars.forEach(function(bar) {
			
			// get large rather than tiny img from yelp
			bar.largeImg = bar.image_url.slice(0, -6) + "l.jpg";
			
			$('#barList').append(
					"<div class='col s12 m6'>" +
					  "<div class='card medium'>" +
						"<div class='card-image'>" +
						  "<img src='" + bar.largeImg + "'>" +
						  "<span class='card-title'>" + bar.name +"</span>" +
						"</div>" +
						"<div class='card-content'>" +
							"<p class='description truncate'>" + bar.snippet_text + "</p>" +
							"<a href='" + bar.url + "' class='btn'>Yelp</a>" +
							"<a href='#' id='" + bar.id + "' class='btn right-align goingButton'>I'm Going</a>" +  
					  	"</div>" +
					"</div>" +
					"</div>"
				)
		})
	}

});